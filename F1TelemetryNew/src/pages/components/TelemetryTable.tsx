import {ScrollView, FlatList } from "react-native";
import { DriverRow } from "../../entities/driver/DriverRow";
import { DriverState } from '../../entities/driver/model/types'; 

type Props = {
  drivers: DriverState[];
};

export const TelemetryTable = ({ drivers }: Props) => {
  return (
    <ScrollView horizontal={true}>
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.racing_number}
        renderItem={({ item }) => <DriverRow driver={item} />}
      />
    </ScrollView>
  );
};