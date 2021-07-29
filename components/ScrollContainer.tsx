import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView } from "react-native";

interface IScrollContiner {
  loading: boolean;
  children: React.ReactNode;
  refreshFn: Function;
}

const ScrollContainer: React.FC<IScrollContiner> = ({
  loading,
  children,
  refreshFn,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshFn();
    setRefreshing(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          enabled={false}
          tintColor={"white"}
        />
      }
      style={{
        backgroundColor: "black",
        paddingBottom: "20px",
      }}
      contentContainerStyle={{
        justifyContent: loading ? "center" : "flex-start",
      }}
    >
      {loading ? <ActivityIndicator color="white" size="small" /> : children}
    </ScrollView>
  );
};

export default ScrollContainer;
