import { MainNavigator } from "./navigation/mainNavigator";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <MainNavigator initialRoute="/about" />
    </MantineProvider>
  );
}

export default App;
