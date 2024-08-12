import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string(),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});
export type IloginProps = {};

const Login: React.FC<IloginProps> = ({}) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post("/api/auth/login", values, { withCredentials: true })
      .then(() => navigate("/HomePage"))
      .catch(() => alert("Authentication failed"));
  }

  return (
    <div>
      <h2>Welcome to MyWorkStatus</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="user name">Username</label>
        <div>
          <input
            placeholder="My Username"
            {...form.register("username", {
              required: "this field is required",
            })}
          />
        </div>
        <label htmlFor="password">Password</label>
        <div>
          <input
            type="password"
            placeholder="My Password"
            {...form.register("password", {
              required: "this field is required",
            })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export { Login };
