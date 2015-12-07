#!/bin/bash

#clear file

MAXCOUNT=1000

#for every town create a file with temperatures
for CITY in "Aachen" "Berlin" "SHARKTOWN"; do
  echo "write $MAXCOUNT numbers between 5 and 40 into file $CITY."
  echo -n "" > $CITY

  #set start values for creating temperatures
  R=20
  COUNTER=0

  while [  $COUNTER -lt $MAXCOUNT ]; do
    #loop
    let R=$RANDOM%5-2+$R
    if [ "$R" -gt 40 ]
      then
      R=40
    elif [ "$R" -lt 5 ]
      then
      R=5
    fi
    echo -n "$R " >> $CITY
    let COUNTER=COUNTER+1
  done
  echo "wrote $MAXCOUNT numbers between 5 and 40 into file $CITY."
done
echo "wrote all files"
