import { Account, User } from "../gsuite/GSuiteClient";

import {
  ACCOUNT_ENTITY_TYPE,
  ACCOUNT_USER_RELATIONSHIP_CLASS,
  ACCOUNT_USER_RELATIONSHIP_TYPE,
  AccountUserRelationship,
  USER_ENTITY_TYPE,
} from "../jupiterone";

import generateEntityKey from "../utils/generateEntityKey";

export function createAccountUserRelationships(
  users: User[],
  account: Account,
) {
  const defaultValue: AccountUserRelationship[] = [];

  return users.reduce((acc, user) => {
    const parentKey = generateEntityKey(ACCOUNT_ENTITY_TYPE, account.id);
    const childKey = generateEntityKey(USER_ENTITY_TYPE, user.id);

    const relationship: AccountUserRelationship = {
      _class: ACCOUNT_USER_RELATIONSHIP_CLASS,
      _fromEntityKey: parentKey,
      _key: `${parentKey}_has_${childKey}`,
      _type: ACCOUNT_USER_RELATIONSHIP_TYPE,
      _toEntityKey: childKey,
    };

    return [...acc, relationship];
  }, defaultValue);
}
