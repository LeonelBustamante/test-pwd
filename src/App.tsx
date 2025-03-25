import { CopyOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Form,
  Image,
  Input,
  Layout,
  message,
  Row,
  Typography,
} from "antd";
import { useState } from "react";

const { Header, Content } = Layout;
const { Item } = Form;
const { Title } = Typography;

function App() {
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  // Validaciones individuales
  const validations = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const allValid = Object.values(validations).every(Boolean);

  const missingRequirements = [
    !validations.length && "Debe tener al menos 8 caracteres.",
    !validations.lowercase && "Debe contener al menos una minúscula.",
    !validations.uppercase && "Debe contener al menos una mayúscula.",
    !validations.number && "Debe contener al menos un número.",
    !validations.symbol && "Debe contener al menos un símbolo.",
  ].filter(Boolean);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      messageApi.success("Contraseña copiada al portapapeles");
    } catch (err) {
      messageApi.error("No se pudo copiar la contraseña");
    }
  };

  return (
    <>
      {contextHolder}
      <Layout style={{ height: "100vh", width: "100vw" }}>
        <Header>
          <Image src="/logo-white.svg" height="90%" preview={false} />
        </Header>
        <Content style={{ paddingTop: "4rem" }}>
          <Row justify="center" align="middle">
            <Col span={12}>
              <Title level={1}>Test de contraseñas</Title>
              <Form layout="vertical" size="large">
                <Item label="Ingresa tu contraseña">
                  <Input
                    value={password}
                    size="large"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Item>
              </Form>

              {/* Mostrar alertas si hay algo escrito */}
              {password && (
                <div style={{ marginTop: "1rem" }}>
                  {missingRequirements.map((msg, index) => (
                    <Alert
                      key={index}
                      message={msg}
                      type="error"
                      showIcon
                      style={{ marginBottom: "0.5rem" }}
                    />
                  ))}

                  {/* Si cumple todos los requisitos */}
                  {allValid && (
                    <>
                      <Alert
                        message="Contraseña segura"
                        description="Excelente. Cumple con todos los requisitos."
                        type="success"
                        showIcon
                        style={{ marginBottom: "1rem" }}
                      />
                      <Button
                        icon={<CopyOutlined />}
                        type="primary"
                        onClick={handleCopy}
                      >
                        Copiar contraseña
                      </Button>
                    </>
                  )}
                </div>
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default App;
