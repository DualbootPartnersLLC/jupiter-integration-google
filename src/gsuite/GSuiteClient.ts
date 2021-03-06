import { GaxiosResponse } from "gaxios";
import { JWT, JWTOptions } from "google-auth-library";
import { admin_directory_v1, google } from "googleapis";

export enum MemberType {
  CUSTOMER = "CUSTOMER",
  EXTERNAL = "EXTERNAL",
  GROUP = "GROUP",
  USER = "USER",
}

export interface Account {
  id: string;
  name: string;
}

interface UserOrganization {
  title?: string;
  primary?: boolean;
  customType?: string;
  department?: string;
  description?: string;
  costCenter?: string;
}

export interface User extends admin_directory_v1.Schema$User {
  id: string;
  locations?: Location[];
  organizations?: UserOrganization[];
}

export interface Location {
  type?: string;
  area?: string;
  buildingId?: string;
  floorName?: string;
  floorSection?: string;
}

export interface Member extends admin_directory_v1.Schema$Member {
  id: string;
  groupId: string;
  memberType: MemberType;
}

export interface Group extends admin_directory_v1.Schema$Group {
  id: string;
}

export interface GSuiteDataModel {
  groups: Group[];
  users: User[];
  members: Member[];
}

export default class GSuiteClient {
  private client: admin_directory_v1.Admin;
  private accountId: string;
  private credentials: JWTOptions;

  constructor(accountId: string, credentials: JWTOptions) {
    this.accountId = accountId;
    this.credentials = credentials;
  }

  public async authenticate() {
    const auth = new JWT({
      ...this.credentials,
      scopes: [
        "https://www.googleapis.com/auth/admin.directory.user.readonly",
        "https://www.googleapis.com/auth/admin.directory.group.readonly",
        "https://www.googleapis.com/auth/admin.directory.domain.readonly",
      ],
    });

    await auth.authorize();

    this.client = google.admin({
      version: "directory_v1",
      auth,
    });
  }

  public async fetchGroups(): Promise<Group[]> {
    let groups: Group[] = [];
    let pageToken: string | undefined = "";

    do {
      const result = (await this.client.groups.list({
        customer: this.accountId,
        pageToken,
      })) as GaxiosResponse<admin_directory_v1.Schema$Groups>;

      if (result.data && result.data.groups) {
        const pageGroups = result.data.groups as Group[];
        groups = [...groups, ...pageGroups];
        pageToken = result.data.nextPageToken;
      }
    } while (pageToken);

    return groups;
  }

  public async fetchMembers(groupId: string): Promise<Member[]> {
    let members: Member[] = [];
    let pageToken: string | undefined = "";

    do {
      const result = (await this.client.members.list({
        groupKey: groupId,
        pageToken,
      })) as GaxiosResponse<admin_directory_v1.Schema$Members>;

      if (result.data && result.data.members) {
        const pageMembers = result.data.members.map(member => ({
          ...member,
          groupId,
          memberType: member.type as MemberType,
          id: member.id as string,
        }));

        members = [...members, ...pageMembers];
        pageToken = result.data.nextPageToken;
      }
    } while (pageToken);

    return members;
  }

  public async fetchUsers(): Promise<User[]> {
    let users: User[] = [];
    let pageToken: string | undefined = "";

    do {
      const result = (await this.client.users.list({
        customer: this.accountId,
        pageToken,
      })) as GaxiosResponse<admin_directory_v1.Schema$Users>;

      if (result.data && result.data.users) {
        const pageUsers = result.data.users as User[];
        users = [...users, ...pageUsers];
        pageToken = result.data.nextPageToken;
      }
    } while (pageToken);

    return users;
  }
}
