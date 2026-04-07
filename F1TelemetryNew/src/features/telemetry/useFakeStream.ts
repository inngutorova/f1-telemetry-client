import { useEffect } from "react";
import { generateSnapshots } from "../../shared/mocks/fakeSnapshots";
import { useSnapshotStore } from "../../entities/snapshot/model/snapshotStore";

export const useFakeStream = () => {
    const setSnapshot = useSnapshotStore((s) => s.setSnapshot);

    useEffect(() => {
        const snapshots = generateSnapshots(100);
        let index = 0;

        const interval = setInterval(() => {
            console.log("FakeStream snapshot:", snapshots[index]);
            setSnapshot(snapshots[index]);
            index++;
            if (index >= snapshots.length) clearInterval(interval);
        }, 2000);

        return () => clearInterval(interval);
    }, []);
};