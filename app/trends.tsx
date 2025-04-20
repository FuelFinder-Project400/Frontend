import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, Text } from "react-native";
import { useTheme } from "../theme/ThemeContent";
import BottomNav from "../components/bottomNav";
import Top from "@/components/top";
import { GetTrends } from "@/aws/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Heading from "@/components/headings";

export default function Trends() {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState("Trends");
    const [trends, setTrends] = useState<any>([]);
    const [refreshing, setRefreshing] = useState(false);
    const cardColors = ["#fc5753", "#64edaf", "#4f95ff", "#fad255", "#fc6270", "#31bae0", "#4bde6f"];
    const [userPreference, setUserPreference] = useState('Petrol'); 
    useEffect(() => {
        const getTrends = async () => {
            try {
                const storedTrends = await AsyncStorage.getItem('trends');
                if (storedTrends) {
                    const parsedTrends = JSON.parse(storedTrends);
                    if (Array.isArray(parsedTrends)) {
                        setTrends(parsedTrends);
                        return;
                    }
                }
                setRefreshing(true);
                const response = await GetTrends();
                const freshTrends = response?.data?.trend_data || [];
                setTrends(freshTrends);
                await AsyncStorage.setItem('trends', JSON.stringify(freshTrends));
                setRefreshing(false);
            } catch (err) {
                console.error("Error fetching trends:", err);
                setTrends([]);
            }
        };
        const getUserPreference = async () => {
            try{
                const fuelPref = await AsyncStorage.getItem('fuelType') || 'Petrol';
                setUserPreference(fuelPref);
            } catch (err){
                console.error("Error:",err);
            }
        }
        getTrends();
        getUserPreference();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const trends = await GetTrends();
            setTrends(trends?.data?.trend_data || []);
        } catch (err) {
            console.error("Error refreshing trends:", err);
            setTrends([]);
        }
        setRefreshing(false);
    };

    // Find the day with the cheapest day using user preference
    const cheapestDay = trends.reduce((minDay: any, current: any) => {
        if(userPreference == "Petrol"){
            if (current.avg_petrol === null) return minDay;
            if (!minDay || current.avg_petrol < minDay.avg_petrol) return current;
            return minDay;
        }
        else{
            if (current.avg_diesel === null) return minDay;
            if (!minDay || current.avg_diesel < minDay.avg_diesel) return current;
            return minDay;
        }
    }, null)?.day;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            flexDirection: 'column',
        },
        scrollContainer: {
            flex: 1,
            paddingHorizontal: 10,
            marginBottom: 20,
        },
        scrollContent: {
            paddingBottom: 40,
        },
        trendCard: {
            borderRadius: 10,
            padding: 15,
            marginBottom: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
        },
        trendRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 4,
        },
        dayText: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.text || "#fff",
        },
        label: {
            fontSize: 16,
            color: '#000',
            fontWeight:'bold'
        },
        value: {
            fontSize: 16,
            fontWeight: "500",
            color: '#FFF',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Top />
            <Heading level={2} style={{margin:10}}>Weekly Trends</Heading>
            <Text style={{color: theme.primaryText, marginHorizontal: 10, marginBottom: 10, fontSize: 16, fontWeight:'bold'}}>Here are last weeks average prices per day</Text>
            <View style={styles.scrollContainer}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {Array.isArray(trends) && trends.length > 0 ? (
                        trends.map((trend: any, index: number) => {
                            const isCheapest = trend.day === cheapestDay;
                            const cardStyle = {
                                ...styles.trendCard,
                                backgroundColor: cardColors[index % cardColors.length] + "90",
                                borderWidth: isCheapest ? 4 : 0,
                                borderColor: isCheapest ? cardColors[index % cardColors.length] : "transparent",
                            };

                            return (
                                <View key={index} style={cardStyle}>
                                    <View style={styles.trendRow}>
                                        <View>
                                            <Text style={styles.dayText}>
                                                {trend.day}
                                            </Text>
                                            <Text style={{marginVertical: 5, color: '#FFF'}}>{isCheapest ? `Cheapest ${userPreference} Day Of The Week! 🌟 ` : ""}</Text> 
                                        </View>
                                    </View>
                                    <View style={styles.trendRow}>
                                        <Text style={styles.label}>Avg Petrol:</Text>
                                        <Text style={styles.value}>
                                            {trend.avg_petrol !== null ? `${trend.avg_petrol} c/L` : "No data"}
                                        </Text>
                                    </View>
                                    <View style={styles.trendRow}>
                                        <Text style={styles.label}>Avg Diesel:</Text>
                                        <Text style={styles.value}>
                                            {trend.avg_diesel !== null ? `${trend.avg_diesel} c/L` : "No data"}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <Text style={{ color: theme.text, textAlign: 'center', marginTop: 20 }}>
                            No trends available.
                        </Text>
                    )}
                </ScrollView>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
                <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </View>
        </SafeAreaView>
    );
}
