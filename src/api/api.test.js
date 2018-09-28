// import fetch from 'cross-fetch'

const fetch = jest.genMockFromModule("cross-fetch");

describe("testing api", () => {
  // beforeEach(() => {
  //     fetch.resetMocks()
  // })

  it("calls google and returns data to me", () => {
    // fetch.mockResponseOnce(JSON.stringify({data: '12345'}))
    //
    // //assert on the response
    // APIRequest('google').then(res => {
    //     expect(res.data).toEqual('12345')
    // })
    //
    // //assert on the times called and arguments given to fetch
    // expect(fetch).toHaveBeenCalled()
    // expect(fetch.mock.calls[0][0]).toEqual('https://google.com')
  });
});