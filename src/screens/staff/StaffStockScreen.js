import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { fetchStocks } from "../../utils/api";

const StaffStockScreen = () => {
    const [stockData, setStockData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            const allStock = await fetchStocks();
            setStockData(allStock);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [navigation]);

    const handleRefreshButtonPress = () => {
        // Trigger data refresh
        fetchData();
    };

    // Table Data
    const tableHead = ['ID', 'Name', 'Quantity', 'Unit', 'Availability'];
    const tableData = stockData?.map((stock) => [
        stock.id.toString(),
        stock.name,
        stock.quantity.toString(),
        stock.unit,
        stock.availability.toString(),
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Stocks</Text>
            <TouchableOpacity
                onPress={handleRefreshButtonPress}
                style={styles.refreshButton}
            >
                <Text style={styles.refreshButtonText}>{'Refresh'}</Text>
            </TouchableOpacity>
            <View style={styles.tableContainer}>
                <View style={styles.row}>
                    {tableHead.map((head, index) => (
                        <View key={index} style={[styles.cell, styles.headCell]}>
                            <Text style={styles.headText}>{head}</Text>
                        </View>
                    ))}
                </View>
                {tableData.map((rowData, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {rowData.map((cellData, cellIndex) => (
                            <View key={cellIndex} style={styles.cell}>
                                <Text style={styles.cellText}>{cellData}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    refreshButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#A9907E',
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        zIndex: 1,
        marginTop: 5,
    },
    refreshButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    tableContainer: {
        marginTop: '5%',
        borderWidth: 2,
        borderColor: '#675D50',
        borderRadius: 8,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#c8e1ff',
    },
    cell: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headCell: {
        backgroundColor: '#A9907E',
    },
    headText: {
        fontSize: 24,
        color: '#ECF0F1',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cellText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default StaffStockScreen;
