import styles from "./styles.module.css";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Input, Button } from "antd";
import Logo from "../../../../shared/images/CirclopediaLogo.svg";
import Services from "../../../../shared/services/auth/login";
import { setToken } from "../../../../shared/utils/authorization";
import { useIntl } from "react-intl";

const Login = () => {
  const { messages } = useIntl();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleChangeEmail = (event: any) => {
    setValues({ ...values, email: event.target.value });
  };
  const handleChangePassword = (event: any) => {
    setValues({ ...values, password: event.target.value });
  };

  const handleSignIn = async () => {
    setLoading(true);
    const value = await Services.loginUser(values);
    if (value) {
      setToken(value?.token);
      history.push("/admin");
    }
    setLoading(false);
  };

  return (
    <Row justify={"center"} align={"middle"} className={styles.cardContainer}>
      <Col span={12}>
        <Row
          justify={"center"}
          align={"middle"}
          className={styles.cardContainerText}
        >
          <Col>
            <div className={styles.logTitle}>
              {messages["SignInToYourAccount"]}
            </div>
            <div className={styles.logText}>{messages["SignIn.Text"]}</div>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row
          justify={"center"}
          align={"middle"}
          className={styles.cardContainerText}
        >
          <Col>
            <Card className={styles.loginCard}>
              <Row
                justify={"space-between"}
                align={"middle"}
                className={"fullHeight"}
              >
                <Col span={8}>
                  <Row align={"middle"}>
                    <img alt={"logo"} src={Logo} width={"150px"} />
                  </Row>
                </Col>
                <Col span={16}>
                  <Row justify="center" className={styles.formRow}>
                    <Col span={24} className={styles.itemContainer}>
                      <div className={styles.label}>{messages["Email"]}</div>
                      <div>
                        <Input
                          value={values?.email}
                          onChange={handleChangeEmail}
                          autoComplete="new-email"
                        />
                      </div>
                    </Col>
                    <Col span={24} className={styles.itemContainer}>
                      <div className={styles.label}>{messages["Password"]}</div>
                      <div>
                        <Input.Password
                          value={values?.password}
                          onChange={handleChangePassword}
                          autoComplete="new-password"
                        />
                      </div>
                    </Col>
                    <Col span={24}>
                      <Button
                        type={"primary"}
                        className={styles.btnSignIn}
                        loading={loading}
                        onClick={handleSignIn}
                      >
                        {messages["SignIn"]}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
