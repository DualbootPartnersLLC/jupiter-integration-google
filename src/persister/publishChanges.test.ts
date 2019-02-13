import { GSuiteClient } from "../gsuite";
import fetchGsuiteData from "../gsuite/fetchGsuiteData";

import { convert } from "./publishChanges";

jest.mock("googleapis", () => {
  const Gsuite = require(`${__dirname}/../../test/utils/mockGsuiteApis`);

  const scheme = {
    groups: {
      list: `${__dirname}/../../test/fixtures/groups.json`
    },
    users: {
      list: `${__dirname}/../../test/fixtures/users.json`
    },
    members: {
      list: `${__dirname}/../../test/fixtures/members.json`
    }
  };

  return Gsuite.mockGsuiteApis(scheme);
});

jest.mock("google-auth-library");

async function getGsuiteData() {
  const provider = new GSuiteClient("fakeId", {
    email: "fake_email",
    key: "fake_key",
    subject: "fake_subject"
  });

  await provider.authenticate();

  return await fetchGsuiteData(provider);
}

test("Convert Groups", async () => {
  const newData = convert(await getGsuiteData());

  expect(newData.groups).toEqual([
    {
      _class: "UserGroup",
      _key: "gsuite-group-id-1",
      _type: "gsuite_group",
      adminCreated: true,
      description: "",
      directMembersCount: "1",
      displayName: "Restircted Test Group",
      email: "restricted.test1@example.com",
      id: "1",
      kind: "admin#directory#group",
      name: "Restircted Test Group"
    },
    {
      _class: "UserGroup",
      _key: "gsuite-group-id-2",
      _type: "gsuite_group",
      adminCreated: true,
      description: "",
      directMembersCount: "2",
      displayName: "Team Test Group",
      email: "team.test.group@example.com",
      id: "2",
      kind: "admin#directory#group",
      name: "Team Test Group"
    }
  ]);
});

test("Convert Users", async () => {
  const newData = convert(await getGsuiteData());

  expect(newData.users).toEqual([
    {
      _key: "gsuite-user-id-3",
      _type: "gsuite_user",
      _class: "User",
      id: "3",
      displayName: "fakeName fakeFamilyName",
      firstName: "fakeName",
      lastName: "fakeFamilyName",
      mfaEnabled: false,
      suspended: false,
      archived: false,
      active: true,
      agreedToTerms: true,
      changePasswordAtNextLogin: false,
      creationTime: "2019-01-28T17:42:32.000Z",
      customerId: "fakeID",
      deletionTime: undefined,
      gender: undefined,
      hashFunction: undefined,
      includeInGlobalAddressList: true,
      ipWhitelisted: false,
      isAdmin: true,
      isDelegatedAdmin: false,
      isEnforcedIn2Sv: false,
      isEnrolledIn2Sv: false,
      isMailboxSetup: true,
      kind: "admin#directory#user",
      lastLoginTime: "2019-02-12T11:42:33.000Z",
      orgUnitPath: "/",
      primaryEmail: "first.user@example.com",
      recoveryEmail: undefined,
      recoveryPhone: undefined,
      suspensionReason: undefined,
      thumbnailPhotoEtag: undefined,
      thumbnailPhotoUrl: undefined
    },
    {
      _key: "gsuite-user-id-4",
      _type: "gsuite_user",
      _class: "User",
      id: "4",
      displayName: "FakeName2 FakeFamilyName2",
      firstName: "FakeName2",
      lastName: "FakeFamilyName2",
      mfaEnabled: false,
      suspended: false,
      archived: true,
      active: true,
      agreedToTerms: true,
      changePasswordAtNextLogin: false,
      creationTime: "2019-01-28T17:32:12.000Z",
      customerId: "fakeID",
      deletionTime: undefined,
      gender: undefined,
      hashFunction: undefined,
      includeInGlobalAddressList: true,
      ipWhitelisted: false,
      isAdmin: true,
      isDelegatedAdmin: false,
      isEnforcedIn2Sv: true,
      isEnrolledIn2Sv: false,
      isMailboxSetup: true,
      kind: "admin#directory#user",
      lastLoginTime: "2019-01-30T11:44:02.000Z",
      orgUnitPath: "/",
      primaryEmail: "fake.user2@example.com",
      recoveryEmail: undefined,
      recoveryPhone: undefined,
      suspensionReason: undefined,
      thumbnailPhotoEtag: undefined,
      thumbnailPhotoUrl: undefined
    },
    {
      _key: "gsuite-user-id-5",
      _type: "gsuite_user",
      _class: "User",
      id: "5",
      displayName: "Test user",
      firstName: "Test",
      lastName: "user",
      mfaEnabled: false,
      suspended: true,
      archived: false,
      active: true,
      agreedToTerms: true,
      changePasswordAtNextLogin: true,
      creationTime: "2019-01-30T15:20:22.000Z",
      customerId: "fakeID",
      deletionTime: undefined,
      gender: undefined,
      hashFunction: undefined,
      includeInGlobalAddressList: true,
      ipWhitelisted: false,
      isAdmin: false,
      isDelegatedAdmin: false,
      isEnforcedIn2Sv: false,
      isEnrolledIn2Sv: true,
      isMailboxSetup: true,
      kind: "admin#directory#user",
      lastLoginTime: "1970-01-01T00:00:00.000Z",
      orgUnitPath: "/",
      primaryEmail: "test@example.com",
      recoveryEmail: undefined,
      recoveryPhone: undefined,
      suspensionReason: undefined,
      thumbnailPhotoEtag: undefined,
      thumbnailPhotoUrl: undefined
    },
    {
      _class: "User",
      _key: "gsuite-user-id-6",
      _type: "gsuite_user",
      active: true,
      agreedToTerms: true,
      archived: false,
      changePasswordAtNextLogin: true,
      creationTime: "2019-01-30T15:20:22.000Z",
      customerId: "fakeID",
      deletionTime: undefined,
      displayName: "",
      firstName: null,
      gender: undefined,
      hashFunction: undefined,
      id: "6",
      includeInGlobalAddressList: true,
      ipWhitelisted: false,
      isAdmin: false,
      isDelegatedAdmin: false,
      isEnforcedIn2Sv: true,
      isEnrolledIn2Sv: true,
      isMailboxSetup: true,
      kind: "admin#directory#user",
      lastLoginTime: "1970-01-01T00:00:00.000Z",
      lastName: null,
      mfaEnabled: true,
      orgUnitPath: "/",
      primaryEmail: "test1@example.com",
      recoveryEmail: undefined,
      recoveryPhone: undefined,
      suspended: false,
      suspensionReason: undefined,
      humbnailPhotoEtag: undefined,
      humbnailPhotoUrl: undefined
    }
  ]);
});

test("Convert Users -> Group Relationships", async () => {
  const newData = convert(await getGsuiteData());

  expect(newData.userGroupRelationships).toEqual([
    {
      _class: "HAS",
      _fromEntityKey: "gsuite-group-id-1",
      _key: "gsuite-group-id-1_has_gsuite-user-id-3",
      _type: "gsuite_user_group",
      _toEntityKey: "gsuite-user-id-3",
      deliverySettings: undefined,
      email: "first.user@example.com",
      id: "3",
      kind: "admin#directory#member",
      role: "MANAGER",
      status: "ACTIVE",
      type: "USER"
    },
    {
      _class: "HAS",
      _fromEntityKey: "gsuite-group-id-1",
      _key: "gsuite-group-id-1_has_gsuite-user-id-6",
      _type: "gsuite_user_group",
      _toEntityKey: "gsuite-user-id-6",
      deliverySettings: undefined,
      email: "test@example.com",
      id: "5",
      kind: "admin#directory#member",
      role: "MEMBER",
      status: "ACTIVE",
      type: "USER"
    },
    {
      _class: "HAS",
      _fromEntityKey: "gsuite-group-id-1",
      _key: "gsuite-group-id-1_has_gsuite-group-id-1",
      _type: "gsuite_user_group",
      _toEntityKey: "gsuite-group-id-1",
      deliverySettings: undefined,
      email: "restricted.test@example.com",
      id: "104221518650717901111",
      kind: "admin#directory#member",
      role: "MEMBER",
      status: "ACTIVE",
      type: "GROUP"
    },
    {
      _class: "HAS",
      _fromEntityKey: "gsuite-group-id-1",
      _key: "gsuite-group-id-1_has_gsuite-group-id-2",
      _type: "gsuite_user_group",
      _toEntityKey: "gsuite-group-id-2",
      deliverySettings: undefined,
      email: "team.test.group@example.com",
      id: "104221518650717901222",
      kind: "admin#directory#member",
      role: "MEMBER",
      status: "ACTIVE",
      type: "GROUP"
    },
    {
      _class: "HAS",
      _fromEntityKey: "gsuite-group-id-2",
      _key: "gsuite-group-id-2_has_gsuite-user-id-3",
      _type: "gsuite_user_group",
      _toEntityKey: "gsuite-user-id-3",
      deliverySettings: undefined,
      email: "first.user@example.com",
      id: "3",
      kind: "admin#directory#member",
      role: "MANAGER",
      status: "ACTIVE",
      type: "USER"
    },
    {
      _class: "HAS",
      _fromEntityKey: "gsuite-group-id-2",
      _key: "gsuite-group-id-2_has_gsuite-user-id-6",
      _type: "gsuite_user_group",
      _toEntityKey: "gsuite-user-id-6",
      deliverySettings: undefined,
      email: "test@example.com",
      id: "5",
      kind: "admin#directory#member",
      role: "MEMBER",
      status: "ACTIVE",
      type: "USER"
    },
    {
      _class: "HAS",
      _fromEntityKey: "gsuite-group-id-2",
      _key: "gsuite-group-id-2_has_gsuite-group-id-1",
      _type: "gsuite_user_group",
      _toEntityKey: "gsuite-group-id-1",
      deliverySettings: undefined,
      email: "restricted.test@example.com",
      id: "104221518650717901111",
      kind: "admin#directory#member",
      role: "MEMBER",
      status: "ACTIVE",
      type: "GROUP"
    },
    {
      _class: "HAS",
      _fromEntityKey: "gsuite-group-id-2",
      _key: "gsuite-group-id-2_has_gsuite-group-id-2",
      _type: "gsuite_user_group",
      _toEntityKey: "gsuite-group-id-2",
      deliverySettings: undefined,
      email: "team.test.group@example.com",
      id: "104221518650717901222",
      kind: "admin#directory#member",
      role: "MEMBER",
      status: "ACTIVE",
      type: "GROUP"
    }
  ]);
});

test("Convert Users -> Group Relationships", async () => {
  const newData = convert(await getGsuiteData());

  expect(newData.passwordPolicies).toEqual([
    {
      _class: "PasswordPolicy",
      _key: "gsuite-password-policy-user-3",
      _type: "gsuite_password_policy",
      requireMFA: false,
      isEnforcedIn2Sv: false,
      isEnrolledIn2Sv: false
    },
    {
      _class: "PasswordPolicy",
      _key: "gsuite-password-policy-user-4",
      _type: "gsuite_password_policy",
      requireMFA: false,
      isEnforcedIn2Sv: true,
      isEnrolledIn2Sv: false
    },
    {
      _class: "PasswordPolicy",
      _key: "gsuite-password-policy-user-5",
      _type: "gsuite_password_policy",
      requireMFA: false,
      isEnforcedIn2Sv: false,
      isEnrolledIn2Sv: true
    },
    {
      _class: "PasswordPolicy",
      _key: "gsuite-password-policy-user-6",
      _type: "gsuite_password_policy",
      isEnforcedIn2Sv: true,
      isEnrolledIn2Sv: true,
      requireMFA: true
    }
  ]);
});

test("Convert User -> PasswordPolicy Relationships", async () => {
  const newData = convert(await getGsuiteData());
  expect(newData.userPasswordPolicyRelationships).toEqual([
    {
      _key: "gsuite-user-id-3_has_gsuite-password-policy-user-3",
      _type: "gsuite_user_password_policy",
      _class: "HAS",
      _fromEntityKey: "gsuite-user-id-3",
      _toEntityKey: "gsuite-password-policy-user-3"
    },
    {
      _key: "gsuite-user-id-4_has_gsuite-password-policy-user-4",
      _type: "gsuite_user_password_policy",
      _class: "HAS",
      _fromEntityKey: "gsuite-user-id-4",
      _toEntityKey: "gsuite-password-policy-user-4"
    },
    {
      _key: "gsuite-user-id-5_has_gsuite-password-policy-user-5",
      _type: "gsuite_user_password_policy",
      _class: "HAS",
      _fromEntityKey: "gsuite-user-id-5",
      _toEntityKey: "gsuite-password-policy-user-5"
    },
    {
      _class: "HAS",
      _fromEntityKey: "gsuite-user-id-6",
      _key: "gsuite-user-id-6_has_gsuite-password-policy-user-6",
      _toEntityKey: "gsuite-password-policy-user-6",
      _type: "gsuite_user_password_policy"
    }
  ]);
});