# MIP Algorithm test report,


TODO: 
don't run algo distributed on local and vice versa
refine models

#### Manuel Spuhler, 2018-09-20

## Approche
Les tests sont effectués sur six MIP installées en mode fédération et local. 
Les expériences sont démarrées de manière séquentielle, en utilisant les mêmes modèles et paramètres d'algorithmes pour chaque plateforme. Les modèles de test utilisés sont simples et visent soit une catégorisation soit une régression.

## Résumé

En moyenne, 50% des algorithmes produisent une erreur de fonctionnement, time-out, ou erreur d'output.

Environ 80% des erreurs concernent un time-out, qui est calculé au bout de 5 mn de non réponse du serveur.

Le détail des mesures est disponible à cette adresse

https://docs.google.com/spreadsheets/d/1wEw4jEOShrCNg3tF3wmf_5YXgfRW_WYOKvU5aexh1bo/edit?usp=sharing

## Overview par algorithme

Les algorithmes suivant fonctionnent dans la majorité des cas:

- histograms, linearRegression, pca, sgdLinearModel, anova, correlationHeatmap, sgdNeuralNetwork, tsne

Les algorithmes suivant donnent au minimum 50% d'erreurs:

- gradientBoosting, knn, kmeans et naiveBayes

Les algorithmes suivant donnent 100% d'erreurs:

- hinmine, ggparci, heatmaply, kmeans et hedwig

## Autres mesures à effectuer

Une seul expérience est constituée de 2 méthodes et a donnée des erreurs dans 100% des cas, à évaluer de manière plus précise lors de prochain tests.

A ajouter aux tests par la suite:

- la qualité des ouputs des algorithmes ayant donné un résultat
- la cross-validation pour les algorithmes prédictifs
- des paramètres différents pour les algorithmes
- des modèles plus complexes de cas cliniques ou théoriques.

## Conclusion

La première mesure à prendre serait de réparer le problème des time-outs ce qui permettrait de déterminer de manière plus précise la suite des tests à effectuer. Il est en effet actuellement difficile de connaître la raison précise de ces time-outs, mais on observe que certains algorithmes sont plus sujets à cette erreur que d'autres.


### logs, model definitions && algorithms
https://drive.google.com/file/d/173WS84bWSri7Qaxt7gf5ApCF3249Qfuk/view?usp=sharing



