// src/features/settings/ui/TableSettingsModal.tsx
import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Switch,
    Alert,
} from 'react-native';
import { tableColumns, TableColumn, ColumnKey } from '../../../shared/config/tableConfig';
import { useSettingsStore } from '../../settings/model/settingsStore';

type Props = {
    visible: boolean;
    onClose: () => void;
};

export const TableSettingsModal = ({ visible, onClose }: Props) => {
    const { userSettings, setUserSettings, saveSettings } = useSettingsStore();
    const [columns, setColumns] = useState<TableColumn[]>([]);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (visible) {
            // Загружаем колонки в сохраненном порядке
            let orderedColumns: TableColumn[];
            
            if (userSettings.columnsOrder && userSettings.columnsOrder.length > 0) {
                // Сортируем колонки согласно сохраненному порядку
                orderedColumns = userSettings.columnsOrder
                    .map(key => {
                        const originalCol = tableColumns.find(col => col.key === key);
                        if (originalCol) {
                            return {
                                ...originalCol,
                                visible: userSettings.columnsVisible[key] ?? originalCol.visible,
                            };
                        }
                        return null;
                    })
                    .filter((col): col is TableColumn => col !== null);
                
                // Добавляем новые колонки, которых нет в сохраненном порядке
                const existingKeys = new Set(userSettings.columnsOrder);
                const newColumns = tableColumns.filter(col => !existingKeys.has(col.key));
                if (newColumns.length > 0) {
                    orderedColumns = [...orderedColumns, ...newColumns];
                }
            } else {
                // Если нет сохраненного порядка, используем стандартный порядок
                orderedColumns = tableColumns.map(col => ({
                    ...col,
                    visible: userSettings.columnsVisible[col.key] ?? col.visible,
                }));
            }
            
            setColumns(orderedColumns);
            setHasChanges(false);
        }
    }, [visible, userSettings.columnsVisible, userSettings.columnsOrder]);

    const toggleColumn = (key: ColumnKey) => {
        setColumns(prev =>
            prev.map(col =>
                col.key === key ? { ...col, visible: !col.visible } : col
            )
        );
        setHasChanges(true);
    };

    const moveColumn = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;
        const newColumns = [...columns];
        const [movedItem] = newColumns.splice(fromIndex, 1);
        newColumns.splice(toIndex, 0, movedItem);
        setColumns(newColumns);
        setHasChanges(true);
    };

    const handleSave = () => {
        // Сохраняем порядок и видимость колонок
        const columnsVisible: Record<string, boolean> = {};
        const columnsOrder = columns.map(col => col.key);
        
        columns.forEach(col => {
            columnsVisible[col.key] = col.visible;
        });
        
        setUserSettings({ columnsVisible, columnsOrder });
        saveSettings();
        setHasChanges(false);
        onClose();
        
        Alert.alert('Success', 'Column settings saved successfully');
    };

    const handleCancel = () => {
        if (hasChanges) {
            Alert.alert(
                'Unsaved Changes',
                'You have unsaved changes. Do you want to discard them?',
                [
                    { text: 'Keep Editing', style: 'cancel' },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        onPress: () => {
                            setHasChanges(false);
                            onClose();
                        },
                    },
                ]
            );
        } else {
            onClose();
        }
    };

    const renderItem = ({ item, index }: { item: TableColumn; index: number }) => (
        <View style={styles.columnItem}>
            <View style={styles.columnInfo}>
                <Text style={styles.columnTitle}>{item.title}</Text>
            </View>
            
            <View style={styles.columnControls}>
                <View style={styles.moveButtons}>
                    <TouchableOpacity
                        style={[styles.moveButton, index === 0 && styles.moveButtonDisabled]}
                        onPress={() => moveColumn(index, index - 1)}
                        disabled={index === 0}
                    >
                        <Text style={styles.moveButtonText}>↑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.moveButton, index === columns.length - 1 && styles.moveButtonDisabled]}
                        onPress={() => moveColumn(index, index + 1)}
                        disabled={index === columns.length - 1}
                    >
                        <Text style={styles.moveButtonText}>↓</Text>
                    </TouchableOpacity>
                </View>
                <Switch
                    value={item.visible}
                    onValueChange={() => toggleColumn(item.key)}
                    trackColor={{ false: '#3B4C5D', true: '#0b2d71' }}
                    thumbColor={item.visible ? '#FFFFFF' : '#AAB4C3'}
                />
            </View>
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Customize Columns</Text>
                        <Text style={styles.modalSubtitle}>
                            Use ↑↓ arrows to reorder • Toggle to show/hide
                        </Text>
                    </View>

                    <FlatList
                        data={columns}
                        keyExtractor={(item) => item.key}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContent}
                    />

                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleCancel}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#1F2A3A',
        borderRadius: 12,
        width: '90%',
        maxHeight: '80%',
        overflow: 'hidden',
    },
    modalHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#3B4C5D',
    },
    modalTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    modalSubtitle: {
        color: '#AAB4C3',
        fontSize: 12,
    },
    listContent: {
        paddingVertical: 8,
    },
    columnItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#2A3B4C',
        marginHorizontal: 12,
        marginVertical: 4,
        borderRadius: 8,
    },
    columnInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    columnTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    columnControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    moveButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    moveButton: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#3B4C5D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moveButtonDisabled: {
        opacity: 0.3,
    },
    moveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    modalFooter: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#3B4C5D',
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#3B4C5D',
    },
    saveButton: {
        backgroundColor: '#0b2d71', // Синий цвет вместо зеленого
    },
    cancelButtonText: {
        color: '#AAB4C3',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});