module Test.MySolutions where

import Prelude
import Data.Int
import Data.Number (sqrt,pi)

diagonal a b = sqrt (a * a + b * b) 

circleArea r = pi * (r * r) 

leftoverCents c = rem c 100
