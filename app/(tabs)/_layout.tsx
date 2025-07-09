import {View, Text, Image} from 'react-native'
import React from 'react'
import {Redirect, Tabs} from "expo-router";
import useAuthStore from "@/store/auth.store";
import {TabBarIconProps} from "@/types";
import {images} from "@/constants";
import cn from "clsx";

export default function  TabLayout() {
    const TabBarIcon = ({ focused , icon, title} : TabBarIconProps) => (
        <View className = "tab-icon">
            <Image source={icon} className="size-7" resizeMode={"contain"} tintColor={focused ? "#fe8c00" : "#5d5f6d"}/>
        <Text className={cn("text-sm font-bold", focused ? "text-primary" : "text-gray-200")}>
            {title}
        </Text>
        </View>
    )

    const { isAuthenticated } = useAuthStore();

    if(!isAuthenticated) <Redirect href="/sign-in" />
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    height: 70,
                    position: "absolute",
                    bottom: 40,
                    shadowColor: "#1a1a1a",
                    backgroundColor: "white",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    marginHorizontal: 20,
                    shadowRadius: 4,
                    elevation: 5,
                }
            }}
        >
            <Tabs.Screen
                name = 'index'
                options={{
                    title:"Home",
                    tabBarIcon: ({ focused }) => <TabBarIcon title={"Home"} focused={focused} icon={images.home}/>
                }}
            />
            <Tabs.Screen
                name = 'search'
                options={{
                    title:"search",
                    tabBarIcon: ({ focused }) => <TabBarIcon title={"Search"} focused={focused} icon={images.search}/>
                }}
            />
            <Tabs.Screen
                name = 'cart'
                options={{
                    title: "cart",
                    tabBarIcon: ({ focused }) => <TabBarIcon title={"Cart"} focused={focused} icon={images.bag}/>
                }}
            />
            <Tabs.Screen
                name = 'profile'
                options={{
                    title:"profile",
                    tabBarIcon: ({ focused }) => <TabBarIcon title={"Profile"} focused={focused} icon={images.person}/>
                }}
            />
        </Tabs>
    )
}
