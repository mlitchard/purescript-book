module Test.MySolutions where

import Prelude

import Control.Alternative (guard)
import Data.Array
import Data.Boolean
import Data.Int
import Data.Maybe -- (fromMaybe)
import Data.Number (pow)
import Data.Ord (abs)

isEven :: Int -> Boolean
isEven (-1) = false
isEven 0    = true
isEven 1    = false
isEven x    = isEven ((abs x) - 2)

countEven :: Array Int -> Int
countEven arr = 
  if null arr then
    0
  else
    if (isEven next) then
      1 + countEven rest
    else
      countEven rest
  where
    next = fromMaybe (-1) (head arr)
    rest = fromMaybe [] (tail arr)

squared :: Array Number -> Array Number
squared = map (\x -> x * x) 

keepNonNegative :: Array Number -> Array Number
keepNonNegative = filter (\x -> x >= 0.0)

infixl 4 filter as <$?>

keepNonNegativeRewrite :: Array Number -> Array Number
keepNonNegativeRewrite arr = (\x -> x >= 0.0) <$?> arr

isPrime :: Int -> Boolean
isPrime i = not (elem false $ isPrime')
  where
    testSet = (2 .. i)
    primeTest d = not ((i `mod` d) == 0) 
    boundCheck d = if (d * d <= i) then primeTest d else true
    isPrime' = map (\d -> boundCheck d) testSet


