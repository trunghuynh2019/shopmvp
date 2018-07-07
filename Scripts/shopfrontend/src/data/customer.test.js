import { fetchAll } from './Customer'
 
describe('testing fetch all', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
 
  it('calls fetch all and returns data to me', () => {
    fetch.mockResponseOnce(JSON.stringify({ id: 25, name: "Shop25" }))
 
    //assert on the response
    fetchAll().then(res => {
      expect(res.name).toEqual('Shop25')
    })
 
    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
  })
})