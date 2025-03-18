import { IndiePitcher } from '.';
import type { IndiePitcherResponseError } from './errors';

require('dotenv').config();
const apiKey = process.env.API_KEY;

const indiePitcher = new IndiePitcher(apiKey ?? '');

afterEach(() => {
  // work around API rate limit
  return new Promise((resolve) => setTimeout(resolve, 1000));
});

test('invalid API key', async () => {
  const indiePitcher = new IndiePitcher('xxx');
  try {
    await indiePitcher.listMailingLists();
  } catch (error) {
    expect((error as IndiePitcherResponseError).message).toBe('Unauthorized');
  }
});

test('list mailing lists', async () => {
  const data = await indiePitcher.listMailingLists();
  expect(data.data.length).toBe(3);
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
  expect(data.data.length).toBeGreaterThan(0);
});

test('find contact', async () => {
  const data = await indiePitcher.findContact('petr@indiepitcher.com');
  expect(data.data.email).toBe('petr@indiepitcher.com');
});

test('manage contact', async () => {
  const email = 'test@example.com';

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

test('create multiple contacts', async () => {
  const email = 'test@example.com';

  await indiePitcher.addContacts([{ email: "test@example.com" }, { email: "test2@example.com" }])

  await indiePitcher.deleteContact("test@example.com");
  await indiePitcher.deleteContact("test2@example.com");
});

test('send email outside of contact list', async () => {
  const email = 'petr@example.com';

  await indiePitcher.sendEmail({
    to: email,
    subject: 'Test marketing email from IP Node SDK unit tests',
    body: 'This is a test body that supports **markdown**.',
    bodyFormat: 'markdown',
  });
});

test('send email to contact', async () => {
  const email = 'petr@example.com';

  await indiePitcher.sendEmailToContact({
    contactEmail: email,
    subject: 'Test marketing email from IP Node SDK unit tests',
    body: 'This is a test body that supports **markdown**.',
    bodyFormat: 'markdown',
    list: 'integration-tests',
  });
});

test('send marketing email to mailing list', async () => {
  await indiePitcher.sendEmailToMailingList({
    list: 'integration-tests',
    subject: 'Test marketing email from IP Node SDK unit tests',
    body: 'This is a test body that supports **markdown**.',
    bodyFormat: 'markdown',
  });
});
