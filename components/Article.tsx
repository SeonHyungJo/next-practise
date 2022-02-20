import useSWR, {useSWRConfig} from 'swr'

const fetcher = url => fetch(`https://jsonplaceholder.typicode.com/todos/1`).then(r => r.json())

function Article() {
  const {data} = useSWR('/todos/1', fetcher)
  const {refreshInterval, mutate, cache, fallback, ...restConfig} = useSWRConfig()

  // console.log('refreshInterval', refreshInterval)
  console.log('fallback', fallback)
  console.log('cache', cache)
  console.log('restConfig', restConfig)
  console.log('data', data)

  return (
    <div>
      {'Article'}
      {data.title}
    </div>
  );
}

export default Article;

