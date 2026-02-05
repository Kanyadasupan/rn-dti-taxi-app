import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

export default function Home() {
  // ประกาศตัวแปร
  const [distance, setDistance] = useState("");
  const [traffic, setTraffic] = useState("");
  const [result, setResult] = useState({
    total: 0,
    distancePrice: 0,
    timePrice: 0,
  });

  // คำนวณ
  const handleCalculate = () => {
    const dist = parseFloat(distance);
    const time = parseFloat(traffic);

    if (isNaN(dist) || isNaN(time)) {
      Alert.alert("แจ้งเตือน", "กรุณากรอกข้อมูลระยะทางและเวลาให้ครบถ้วน");
      return;
    }

    // คิดค่าเวลารถติด (นาทีละ 3 บาท)
    const timeCharge = time * 3.0;

    // คิดค่าระยะทาง
    let distanceCharge = 0;
    if (dist <= 1) {
      distanceCharge = 35;
    } else {
      distanceCharge = 35;
      let remainingDist = dist - 1;

      // คำนวณระยะทาง
      const steps = [
        { limit: 9, rate: 6.5 }, // กม. 2-10
        { limit: 10, rate: 7.0 }, // กม. 10-20
        { limit: 20, rate: 8.0 }, // กม. 20-40
        { limit: 20, rate: 8.5 }, // กม. 40-60
        { limit: 20, rate: 9.0 }, // กม. 60-80
      ];
      for (let step of steps) {
        if (remainingDist > 0) {
          const distInStep = Math.min(remainingDist, step.limit);
          distanceCharge += distInStep * step.rate;
          remainingDist -= distInStep;
        }
      }
      // ส่วนที่เกิน 80 กม.
      if (remainingDist > 0) {
        distanceCharge += remainingDist * 10.5;
      }
    }

    // รวมยอด
    const finalTotal = distanceCharge + timeCharge;

    setResult({
      total: finalTotal,
      distancePrice: distanceCharge,
      timePrice: timeCharge,
    });

  };

  // ล้างค่า
  const handleReset = () => {
    setDistance("");
    setTraffic("");
    setResult({ total: 0, distancePrice: 0, timePrice: 0 });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/taxi.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>คำนวณค่าแท็กซี่</Text>

          <View style={styles.fame}>
            <Text style={styles.txt}>ระยะทาง (กิโลเมตร)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0.0"
              value={distance}
              onChangeText={(text) => setDistance(text)}
            ></TextInput>
            <Text style={styles.txt}>เวลารถติด (นาที)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0"
              value={traffic}
              onChangeText={(text) => setTraffic(text)}
            ></TextInput>
            <View style={styles.btnfame}>
              <TouchableOpacity style={styles.btncal} onPress={handleCalculate}>
                <Text style={styles.txtbtncal}>คำนวณราคา</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnres} onPress={handleReset}>
                <Text style={styles.txtbtnres}>ล้างค่า</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.fameresult}>
            <Text style={[styles.txtres, { textAlign: "center" }]}>
              ค่าโดยสารโดยประมาณ
            </Text>
            <View style={styles.resultbaTH}>
              <Text style={styles.txtcalres}>
                {new Intl.NumberFormat("th-TH", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(result.total)}
              </Text>
              <Text style={styles.txtbath}> บาท</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.txtres}>ค่าโดยสารตามระยะทาง</Text>
              <Text style={styles.txtres}>
                {new Intl.NumberFormat("th-TH", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(result.distancePrice)}{" "}
                ฿
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.txtres}>ค่ารถติด (นาที)</Text>
              <Text style={styles.txtres}>
                {new Intl.NumberFormat("th-TH", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(result.timePrice)}{" "}
                ฿
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 30,
  },
  title: {
    fontSize: 35,
    fontFamily: "Prompt_700Bold",
    marginTop: 20,
    color: "#ffc801",
  },
  fame: {
    backgroundColor: "#ffffff",
    width: "90%",
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    fontFamily: "Prompt_400Regular",
    color: "#474747",
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#eeeeee",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  txt: {
    fontSize: 16,
    fontFamily: "Prompt_700Bold",
    marginTop: 20,
    color: "#000000",
  },
  btnfame: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btncal: {
    backgroundColor: "#009788",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    width: "55%",
    alignItems: "center",
  },
  btnres: {
    borderColor: "#d40000",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    width: "40%",
    alignItems: "center",
  },
  txtbtncal: {
    fontSize: 16,
    fontFamily: "Prompt_700Bold",
    color: "#ffffff",
  },
  txtbtnres: {
    fontSize: 16,
    fontFamily: "Prompt_700Bold",
    color: "#d40000",
  },
  fameresult: {
    backgroundColor: "#2f3543",
    width: "90%",
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  txtres: {
    fontSize: 12,
    fontFamily: "Prompt_400Regular",
    color: "#ffffff",
  },
  txtcalres: {
    fontSize: 40,
    fontFamily: "Prompt_700Bold",
    color: "#ffc801",
    marginTop: 10,
  },
  divider: {
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: "100%",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  txtbath: {
    fontSize: 16,
    fontFamily: "Prompt_400Regular",
    color: "#ffc801",
    marginTop: 10,
  },
  resultbaTH: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: 10,
  },
});
