import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";



export default function Index() {

  // โหลดหน้าจอ
  useEffect(() => {
    const timer = setTimeout(() => {router.replace("/home");}, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <Image
          source={require("@/assets/images/taxi.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>TAXI METER</Text>
        <Text style={styles.caption}>THAI FARE CALCULATOR</Text>
        <ActivityIndicator size="large" color="#009788" style={styles.loader} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe200",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 40,
    fontFamily: "Prompt_700Bold",
    marginTop: 20,
    color: "#322c6e",
  },
  caption: {
    fontSize: 14,
    fontFamily: "Prompt_700Bold",
    color: "#009788",
  },
  frame: {
    alignItems: "center",
    justifyContent: "center",
    padding: 70,
    borderRadius: 10,
    backgroundColor: "#fdef81",
  },
  loader: {
    marginTop: 50,
  },
});
