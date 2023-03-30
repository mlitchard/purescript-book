module Test.MySolutions where

import Prelude

import Data.AddressBook (AddressBook, Entry, emptyBook, findEntry, insertEntry)
import Data.Boolean 
import Data.HeytingAlgebra
import Data.List  (head, filter, null, nubByEq)
import Data.Maybe (Maybe)

findEntryByStreet :: String -> AddressBook -> Maybe Entry
findEntryByStreet street book = (head <<< filter filterEntry) book
  where
    filterEntry :: Entry -> Boolean
    filterEntry entry = (_.address.street entry) == street 

isInBook :: String -> String -> AddressBook -> Boolean
isInBook firstName lastName book = 
  not (null (filter nameExists book)) 
  where
    nameExists :: Entry -> Boolean 
    nameExists entry = 
      ((entry.firstName == firstName) && (entry.lastName == lastName))

removeDuplicates :: AddressBook -> AddressBook
removeDuplicates = nubByEq checkDup
  where
    checkDup entryOne entryTwo = 
      (entryOne.firstName) == (entryTwo.firstName) 
        && (entryOne.lastName) == (entryTwo.lastName)
