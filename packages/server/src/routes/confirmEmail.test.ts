import fetch from 'node-fetch';

test('sends invalid back if bad id', async () => {
  const response = await fetch(`${process.env.TEST_HOST}/confirm/232323`);
  const text = await response.text();
  expect(text).toEqual('invalid');
});