import { useNavigate } from "react-router-dom";
import { Button, Input, Space, Divider, message } from "antd";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css"; // Importing CSS module

const Login = () => {
  const navigate = useNavigate(); // Hook useNavigate to handle navigation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/BidKoi/account/login", {
        username: username,
        password: password,
      });

      const data = response.data;

      if (data.success) {
        // Save token to localStorage or sessionStorage
        localStorage.setItem("token", data.token);
        message.success("Login successful!");
        navigate("/"); // Redirect to dashboard page upon successful login
      } else {
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      if (error.response) {
        // Extract error code and message from API response
        const errorMessage = error.response.data.message;
        message.error(`Login failed. : ${errorMessage}`);
        console.error("Login error:", error.response.data);
      } else {
        message.error("An unexpected error occurred.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className={styles.loginpage}>
      <div className={styles.formContainer}>
        <div className={styles.col1}>
          <img
            src="src/assets/z5860878036591_6cfc2dede6582c487e0388ff75d9a13d.jpg"
            alt="Koi Fish"
            className={styles.image}
          />
        </div>

        <div className={`${styles.col2} ${styles.glass2}`}>
          <p className={styles.loginWords}>Welcome Back</p>
          <form className={`${styles.loginForm} ${styles.glass}`} onSubmit={handleLogin}>
            {/* Username Input */}
            <Input
              placeholder="Enter your username"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              className={`${styles.formItem}`}
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "500px", height: "48px" }}
            />

            <br />
            <br />

            {/* Password Input with visibility toggle */}
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Input.Password
                placeholder="Enter your password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                className={`${styles.formItem}`}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "500px", height: "48px" }}
              />
            </Space>

            <br />

            {/* Login Button */}
            <Button className={styles.formItem2} type="primary" block htmlType="submit">
              Login
            </Button>

            <Divider style={{ borderColor: '#A8A6A7' }}>Or</Divider>

            {/* Google Login Button */}
            <Button className={`${styles.loginGoogle} ${styles.formItem}`} block>
              <img
                src="https://th.bing.com/th/id/R.0dd54f853a1bffb0e9979f8146268af3?rik=qTQlRtQRV5AliQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-google-logo-icon-png-transparent-background-1000.png&ehk=VlcCHZ7jyV%2fCI7dZfbUl8Qb9%2f7uibkF6I6MBoqTtpRU%3d&risl=&pid=ImgRaw&r=0"
                alt="Google logo"
                width={25}
              />
              <span>Continue with Google</span>
            </Button>
          </form>

          <p className={styles.registerLink}>
            Do not have an account?{" "}
            <span
              className={styles.registerLinkText}
              onClick={() => navigate("/Register")}
              style={{ cursor: "pointer" }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
