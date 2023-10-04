import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import SearchStack from "./SearchStack";
import ProfileStack from "./ProfileStack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UpdateStack from "./UpdateStack";

const Tab = createBottomTabNavigator();

const HomeStackOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => <Icon name="home" size={28} />,
};

const SearchStackOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => <Icon name="magnify" size={28} />,
};

const UpdateStackOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => <Icon name="chat-processing" size={28} />,
};

const ProfileStackOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => <Icon name="account-circle" size={28} />,
};

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        options={HomeStackOptions}
        component={HomeStack}
      />
      <Tab.Screen
        name="SearchStack"
        options={SearchStackOptions}
        component={SearchStack}
      />
      <Tab.Screen
        name="UpdateTabsStack"
        options={UpdateStackOptions}
        component={UpdateStack}
      />
      <Tab.Screen
        name="ProfileStack"
        options={ProfileStackOptions}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
