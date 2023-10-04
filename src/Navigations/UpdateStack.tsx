import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UpdateScreen from "../Screens/Update";

const Stack = createNativeStackNavigator();

function UpdateStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Update" component={UpdateScreen} />
    </Stack.Navigator>
  );
}

export default UpdateStack;
