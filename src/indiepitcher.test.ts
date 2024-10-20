import { IndiePitcher } from '.';

require('dotenv').config();
const apiKey = process.env.API_KEY;

const indiePitcher = new IndiePitcher(apiKey ?? '');

afterEach(() => {
  // work around API rate limit
  return new Promise((resolve) => setTimeout(resolve, 1000));
});

test('list mailing lists', async () => {
  const data = await indiePitcher.listMailingLists();
  expect(data.data.length).toBe(2);
});

test('create mailing list management session', async () => {
  const data = await indiePitcher.createMailingListsPortalSession(
    'petr@indiepitcher.com',
    'https://indiepitcher.com',
  );
  expect(data.data.returnURL).toBe('https://indiepitcher.com');
});

test('list contacts', async () => {
  const data = await indiePitcher.listContacts();
  expect(data.data.length).toBe(1);
  const contact = data.data[0];
  expect(contact.email).toBe('petr@indiepitcher.com');
  expect(contact.subscribedToLists.length).toBe(2);
  expect(contact.subscribedToLists[0]).toBe('test_list_1');
  expect(contact.subscribedToLists[1]).toBe('test_list_2');
});

test('manage contact', async () => {
  const email = 'unittestuser@indiepitcher.com';

  const contact = (
    await indiePitcher.addContact({
      email: email,
      subscribedToLists: ['test_list_1', 'test_list_2'],
    })
  ).data;
  expect(contact.email).toBe(email);
  expect(contact.subscribedToLists.length).toBe(2);
  expect(contact.subscribedToLists).toContain('test_list_1');
  expect(contact.subscribedToLists).toContain('test_list_2');

  await indiePitcher.deleteContact(email);
});

test('send email outside of contact list', async () => {
  const email = 'petr@indiepitcher.com';

  await indiePitcher.sendEmail({
    to: email,
    subject: 'Test marketing email from IP Node SDK unit tests',
    body: 'This is a test body that supports **markdown**.',
    bodyFormat: 'markdown',
  });
});

test('send email to contact', async () => {
  const email = 'petr@indiepitcher.com';

  await indiePitcher.sendEmailToContact({
    contactEmail: email,
    subject: 'Test marketing email from IP Node SDK unit tests',
    body: 'This is a test body that supports **markdown**.',
    bodyFormat: 'markdown',
    list: 'test_list_1',
  });
});

test('send email to mailing list', async () => {
  const email = 'petr@indiepitcher.com';

  await indiePitcher.sendEmailToMailingList({
    list: 'test_list_1',
    subject: 'Test marketing email from IP Node SDK unit tests',
    body: 'This is a test body that supports **markdown**.',
    bodyFormat: 'markdown',
  });
});
