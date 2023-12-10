import styles from "./styles.module.css";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Input, Button } from "antd";
import Logo from "../../../../shared/images/CirclopediaLogo.svg";
import Services from "../../../../shared/services/auth/login";
import user from "../../../../configs/user";
import { useIntl } from "react-intl";

const ChangePassword = () => {
  const { messages } = useIntl();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<any>();
  const history = useHistory();
  const handleChange = (name: any, event: any) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    await Services.changePassword({
      ...values,
      id: parseInt(String(user?.user?.id)),
    }).then(async (response: any) => {
      if (response) {
        history.go(-1);
        setLoading(false);
      }
    });
  };

  return (
    <Row justify={"center"} align={"middle"} className={styles.cardContainer}>
      <Col span={24}>
        <Row
          justify={"center"}
          align={"middle"}
          className={styles.cardContainerText}
        >
          <Card className={styles.loginCard}>
            <Row
              justify={"space-between"}
              align={"middle"}
              className={"fullHeight"}
            >
              <Col span={6}>
                <Row align={"middle"}>
                  <img alt={"logo"} src={Logo} width={"150px"} />
                </Row>
              </Col>
              <Col span={18}>
                <Row justify="center" className={styles.formRow}>
                  <Col span={24}>
                    <Row
                      justify={"center"}
                      align={"middle"}
                      className={styles.cardContainerText}
                    >
                      <Col>
                        <div className={styles.logTitle}>
                          {messages["ChangeYourPassword"]}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24} className={styles.itemContainer}>
                    <div className={styles.label}>
                      {messages["OldPassword"]}
                    </div>
                    <div>
                      <Input.Password
                        value={values?.password}
                        onChange={(value: any) =>
                          handleChange("oldPassword", value)
                        }
                        autoComplete="new-password"
                      />
                    </div>
                  </Col>
                  <Col span={24} className={styles.itemContainer}>
                    <div className={styles.label}>
                      {messages["NewPassword"]}
                    </div>
                    <div>
                      <Input.Password
                        value={values?.ConfirmPassword}
                        onChange={(value: any) =>
                          handleChange("newPassword", value)
                        }
                        autoComplete="new-password"
                      />
                    </div>
                  </Col>
                  <Col span={24}>
                    <Button
                      type={"primary"}
                      className={styles.btnSignIn}
                      loading={loading}
                      onClick={handleSave}
                    >
                      {messages["Save"]}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Row>
      </Col>
    </Row>
  );
};

export default ChangePassword;
