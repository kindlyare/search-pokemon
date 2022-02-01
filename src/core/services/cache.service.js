const url = window.location.href

const saveCache = async (cacheKey, value) => {
  const data = new Response(JSON.stringify(value));
  caches.open(cacheKey)
    .then((cache) => {
      cache.put(url, data);
    });
}

const getCache = async (cacheKey) => {
  const cacheStorage = await caches.open(cacheKey);
  
  const cachedResponse = await cacheStorage.match(url);

  if (cachedResponse) {
    return await cachedResponse.json();
  }
  return null;
}

export default {
  get: getCache, 
  save: saveCache
}