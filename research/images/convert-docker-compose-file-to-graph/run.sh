#!/bin/sh

dot -Tpng output.dot -o output.png
dot -Tpdf output.dot -o output.pdf
