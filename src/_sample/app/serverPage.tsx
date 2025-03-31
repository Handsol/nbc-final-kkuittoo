import { sampleServerAction } from '../lib/server-actions/samle-server-action';

const ServerSamplePage = async () => {
  const res = await sampleServerAction();

  return (
    <div>
      {res.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};

export default ServerSamplePage;
