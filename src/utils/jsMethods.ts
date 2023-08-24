export const sliceIntoChunks = (arr: any[] | undefined, chunkSize: number) => {
  const res: typeof arr = [];
  for (let i = 0; i < (arr?.length || 0); i += chunkSize) {
    const chunk = arr?.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};
