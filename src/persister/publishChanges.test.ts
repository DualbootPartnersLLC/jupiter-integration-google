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

test("convert", async () => {
  const provider = new GSuiteClient("fakeId", {
    email: "fake_email",
    key: "fake_key",
    subject: "fake_subject"
  });

  const gsuiteData = await fetchGsuiteData(provider);
  const newData = convert(gsuiteData);
  // testing
});
