set terminal pdfcairo enhanced dashed size 8, 3;

set output "subjects-stats.pdf"

#set title "Title"

set style fill solid 0.5 border -1
set style boxplot nooutliers pointtype 7
set style data boxplot
set boxwidth  0.5
set pointsize 0.5

set multiplot layout 1,3

unset key
set border 2
#set ytics 0.2
#set ylabel "Y Label"
#set yrange [-10:1000]

set datafile separator ","
set grid

COLOR_2="#9E77A1"
COLOR_3="#9A8FBB"
COLOR_4="#8AA9C0"

set ytics 32
set yrange [0:384]
set xtics ("Stars" 1) scale 0.0
plot 'data.txt' using (1):1 linecolor rgb COLOR_2

set ytics 4
set yrange [0:48]
set xtics ("Contributors" 2) scale 0.0
plot 'data.txt' using (2):2 linecolor rgb COLOR_3

set style boxplot outliers pointtype 7
set ytics 1
set yrange [0:12]
set xtics ("Containers" 3) scale 0.0
plot 'data.txt' using (3):3 linecolor rgb COLOR_4

#set xtics ("Containers" 4) scale 0.0
#plot 'data.txt' using (4):4 linecolor rgb COLOR_3
