#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Mar 21 12:15:24 2021

@author: anwar
"""

from typing import TypeVar, List
from extract_data import Data
import numpy as np
from jmetal.algorithm.multiobjective.nsgaii import NSGAII
from jmetal.config import store
from jmetal.core.operator import Mutation, Crossover, Selection
from jmetal.core.problem import Problem
from jmetal.operator import BinaryTournamentSelection
from jmetal.util.comparator import Comparator, MultiComparator
from jmetal.util.density_estimator import CrowdingDistance
from jmetal.util.evaluator import Evaluator
from jmetal.util.generator import Generator
from jmetal.util.ranking import FastNonDominatedRanking
from jmetal.util.termination_criterion import TerminationCriterion
from Problem.Instance_from_Json import createInstance
from instance.Instance import Instance
from constraints.PlacementConstraints import PlacementConstraints
from constraints.AvailableNodesConstraint import AvailableNodesConstraint
from constraints.SatisfyDependencies import SatisfyDependencies
from jmetal.algorithm.multiobjective.nsgaiii import get_extreme_points,get_nadir_point,associate_to_niches,compute_niche_count,niching
S = TypeVar('S')
R = TypeVar('R')


instance=Instance()
Instance=createInstance(instance)

class NSGAIII(NSGAII):

    def __init__(self,
                 reference_directions,
                 problem: Problem,
                 mutation: Mutation,
                 crossover: Crossover,
                 population_size: int = None,
                 selection: Selection = BinaryTournamentSelection(
                     MultiComparator([FastNonDominatedRanking.get_comparator(),
                                      CrowdingDistance.get_comparator()])),
                 termination_criterion: TerminationCriterion = store.default_termination_criteria,
                 population_generator: Generator = store.default_generator,
                 population_evaluator: Evaluator = store.default_evaluator,
                 dominance_comparator: Comparator = store.default_comparator):
        self.reference_directions = reference_directions.compute()

        if not population_size:
            population_size = len(self.reference_directions)
        if self.reference_directions.shape[1] != problem.number_of_objectives:
            raise Exception('Dimensionality of reference points must be equal to the number of objectives')

        super(NSGAIII, self).__init__(
            problem=problem,
            population_size=population_size,
            offspring_population_size=population_size,
            mutation=mutation,
            crossover=crossover,
            selection=selection,
            termination_criterion=termination_criterion,
            population_evaluator=population_evaluator,
            population_generator=population_generator,
            dominance_comparator=dominance_comparator
        )

        self.extreme_points = None
        self.ideal_point = np.full(self.problem.number_of_objectives, np.inf)
        self.worst_point = np.full(self.problem.number_of_objectives, -np.inf)
        
    def create_initial_solutions(self) -> List[S]:
        solutions=[]
        
        while (len(solutions)!=self.population_size):
            sol=self.population_generator.new(self.problem)
            if (SatisfyDependencies().evaluate(Instance,sol)==0):
                solutions.append(sol)
                
       
        
        return(solutions) 
  
       
    def reproduction(self, mating_population: List[S]) -> List[S]:
        number_of_parents_to_combine = self.crossover_operator.get_number_of_parents()

        if len(mating_population) % number_of_parents_to_combine != 0:
            raise Exception('Wrong number of parents')

        offspring_population = []
        for i in range(0, self.offspring_population_size, number_of_parents_to_combine):
            parents = []
            for j in range(number_of_parents_to_combine):
                parents.append(mating_population[i + j])

            offspring = self.crossover_operator.execute(parents)
            
            for solution in offspring:
                
                self.mutation_operator.execute(solution)
                # here i will add constraints
                if((PlacementConstraints().evaluate(Instance,solution))==0 and SatisfyDependencies().evaluate(Instance,solution)==0):
                    
                    offspring_population.append(solution)
                if len(offspring_population) >= self.offspring_population_size:
                    break
        
        return offspring_population            
    
    def replacement(self, population: List[S], offspring_population: List[S]) -> List[S]:
       
        
        F = np.array([s.objectives for s in population])

        # find or usually update the new ideal point - from feasible solutions
        # note that we are assuming minimization here!
        self.ideal_point = np.min(np.vstack((self.ideal_point, F)), axis=0)
        self.worst_point = np.max(np.vstack((self.worst_point, F)), axis=0)

        # calculate the fronts of the population
        ranking = FastNonDominatedRanking(self.dominance_comparator)
        ranking.compute_ranking(population + offspring_population, k=self.population_size)

        fronts, non_dominated = ranking.ranked_sublists, ranking.get_subfront(0)

        # find the extreme points for normalization
        self.extreme_points = get_extreme_points(F=np.array([s.objectives for s in non_dominated]),
                                                 n_objs=self.problem.number_of_objectives,
                                                 ideal_point=self.ideal_point,
                                                 extreme_points=self.extreme_points)

        # find the intercepts for normalization and do backup if gaussian elimination fails
        worst_of_population = np.max(F, axis=0)
        worst_of_front = np.max(np.array([s.objectives for s in non_dominated]), axis=0)

        nadir_point = get_nadir_point(extreme_points=self.extreme_points,
                                      ideal_point=self.ideal_point,
                                      worst_point=self.worst_point,
                                      worst_of_population=worst_of_population,
                                      worst_of_front=worst_of_front)

        #  consider only the population until we come to the splitting front
        pop = np.concatenate(ranking.ranked_sublists)
        F = np.array([s.objectives for s in pop])

        # update the front indices for the current population
        counter = 0
        for i in range(len(fronts)):
            for j in range(len(fronts[i])):
                fronts[i][j] = counter
                counter += 1
        last_front = np.array(fronts[-1])

        # associate individuals to niches
        niche_of_individuals, dist_to_niche = associate_to_niches(F=F,
                                                                  niches=self.reference_directions,
                                                                  ideal_point=self.ideal_point,
                                                                  nadir_point=nadir_point)

        # if we need to select individuals to survive
        if len(pop) > self.population_size:
            # if there is only one front
            if len(fronts) == 1:
                until_last_front = np.array([], dtype=np.int)
                niche_count = np.zeros(len(self.reference_directions), dtype=np.int)
                n_remaining = self.population_size
            # if some individuals already survived
            else:
                until_last_front = np.concatenate(fronts[:-1])
                niche_count = compute_niche_count(len(self.reference_directions),
                                                  niche_of_individuals[until_last_front])
                n_remaining = self.population_size - len(until_last_front)

            S_idx = niching(pop=pop[last_front],
                            n_remaining=n_remaining,
                            niche_count=niche_count,
                            niche_of_individuals=niche_of_individuals[last_front],
                            dist_to_niche=dist_to_niche[last_front])

            survivors_idx = np.concatenate((until_last_front, last_front[S_idx].tolist()))
            pop = pop[survivors_idx]

        return list(pop)

    def get_result(self):
        """ Return only non dominated solutions."""
        ranking = FastNonDominatedRanking(self.dominance_comparator)
        ranking.compute_ranking(self.solutions, k=self.population_size)

        return ranking.get_subfront(0)

    def get_name(self) -> str:
        return 'NSGAIII'
