-- | 
-- Module: PriorityQ.hs
-- Priority Queues, using heaps.
-- Based on code by L. Paulson in _ML for the Working Programmer_.

--- This code is from my primenator project, where I have the following attribution

-- Adapted for Haskell by Melissa O'Neill.
-- with bugfix to leftrem by Bertram Felgenhauer.
--
-- Code may be used freely, as long as attributions remain accurate.

module Data.PriorityQ where

import Prelude
import Data.Boolean
import Data.Maybe
import Data.Tuple

data PriorityQ k v 
  = Lf
  | Br k v (PriorityQ k v) (PriorityQ k v)

empty :: forall (k :: Type) (v :: Type). PriorityQ k v
empty = Lf

isEmpty :: forall (k :: Type) (v :: Type). PriorityQ k v -> Boolean
isEmpty Lf = true
isEmpty _  = false

minKeyValue :: forall (k :: Type) (v :: Type). 
                                        PriorityQ k v -> Maybe (Tuple k v)
minKeyValue (Br k v _ _) = Just (Tuple k v)
minKeyValue _            = Nothing

minKey :: forall (k :: Type) (v :: Type). PriorityQ k v -> Maybe k
minKey (Br k _ _ _)         = Just k
minKey _                    = Nothing

minValue :: forall (k :: Type) (v :: Type). PriorityQ k v -> Maybe v
minValue (Br _ v _ _)       = Just v
minValue _                  = Nothing

insert :: forall (k :: Type) (v :: Type). Ord k => k -> v -> PriorityQ k v -> PriorityQ k v
insert wk wv (Br vk vv t1 t2)
               | wk <= vk   = Br wk wv (insert vk vv t2) t1
               | otherwise  = Br vk vv (insert wk wv t2) t1
insert wk wv Lf             = Br wk wv Lf Lf

siftdown :: forall (k :: Type) (v :: Type). Ord k => k -> v -> PriorityQ k v -> PriorityQ k v -> PriorityQ k v
siftdown wk wv Lf _             = Br wk wv Lf Lf
siftdown wk wv (t @ (Br vk vv _ _)) Lf 
    | wk <= vk                  = Br wk wv t Lf
    | otherwise                 = Br vk vv (Br wk wv Lf Lf) Lf
siftdown wk wv (t1 @ (Br vk1 vv1 p1 q1)) (t2 @ (Br vk2 vv2 p2 q2))
    | wk <= vk1 && wk <= vk2    = Br wk wv t1 t2
    | vk1 <= vk2                = Br vk1 vv1 (siftdown wk wv p1 q1) t2
    | otherwise                 = Br vk2 vv2 t1 (siftdown wk wv p2 q2)

