import { saveAccount } from "../utils/storage";

export default function LoginXtream({ onDone }) {
  let server, user, pass;

  const save = () => {
    saveAccount({ server: server.value, username: user.value, password: pass.value });
    onDone();
  };

  return (
    <div className="screen">
      <input placeholder="Server URL" ref={r => server = r} />
      <input placeholder="Username" ref={r => user = r} />
      <input placeholder="Password" type="password" ref={r => pass = r} />
      <button onClick={save}>دخول</button>
    </div>
  );
}
