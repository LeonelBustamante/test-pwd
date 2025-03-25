import {
  Alert,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Layout,
  Menu,
  Row,
  Typography,
} from "antd";
import { useState } from "react";

const { Header, Content } = Layout;
const { Item } = Form;
const { Title, Text } = Typography;

function App() {
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("test");
  const [constrasenaInsegura, setConstrasenaInsegura] = useState("");

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

  const encriptarContrasena = (pwd: string) => {
    let nuevaPwd = pwd;

    // Elimina espacios en blanco al inicio y al final
    nuevaPwd = nuevaPwd.trim();

    // Pasamos a minúsculas
    nuevaPwd = nuevaPwd.toLowerCase();

    // Elimina espacios en blanco intermedios
    nuevaPwd = nuevaPwd.replace(/\s+/g, "%");

    // Pasamos letras con tilde a letras sin tilde
    nuevaPwd = nuevaPwd.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const remplazos: Record<string, string> = {
      a: "4",
      e: "3",
      i: "1",
      o: "0",
      s: "5",
      g: "9",
      t: "7",
      q: "9",
      z: "2",
    };

    let res = "";
    for (let i = 0; i < nuevaPwd.length; i++) {
      if (i === 0) {
        res += nuevaPwd[i].toUpperCase();
        continue;
      }
      const charActual = nuevaPwd[i];
      const nuevoChar = remplazos[charActual] || charActual;
      res += nuevoChar;
    }

    return res;
  };

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Header>
        <Flex
          align="center"
          justify="space-between"
          style={{ height: "100%", width: "100%" }}
        >
          <Image src="/logo-white.svg" preview={false} width={100} />
          <div>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[activeTab]}
              onClick={({ key }) => setActiveTab(key)}
              items={[
                { key: "test", label: "Test contraseñas" },
                { key: "generate", label: "Generar contraseña" },
              ]}
            />
          </div>
        </Flex>
      </Header>
      <Content style={{ paddingTop: "4rem" }}>
        <Row justify="center" align="middle">
          <Col span={12}>
            {activeTab === "test" && (
              <>
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

                    {allValid && (
                      <Alert
                        message="Contraseña segura"
                        description="Excelente. Cumple con todos los requisitos."
                        type="success"
                        showIcon
                      />
                    )}
                  </div>
                )}
              </>
            )}

            {activeTab === "generate" && (
              <>
                <Title level={1}>Generador de contraseñas</Title>
                <Form layout="vertical" size="large">
                  <Item label="Ingresa tu nombre y apellido">
                    <Input
                      value={constrasenaInsegura}
                      size="large"
                      onChange={(e) => setConstrasenaInsegura(e.target.value)}
                    />
                  </Item>
                </Form>
                <div style={{ marginTop: "1rem" }}>
                  {constrasenaInsegura.length > 0 && (
                    <Alert
                      message="Contraseña segura"
                      description={
                        <>
                          <Text>Una contraseña segura podria ser:</Text>
                          <Title level={5}>
                            {encriptarContrasena(constrasenaInsegura)}{" "}
                          </Title>
                        </>
                      }
                      type="success"
                      showIcon
                      style={{ marginBottom: "1rem" }}
                    />
                  )}
                </div>
              </>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
