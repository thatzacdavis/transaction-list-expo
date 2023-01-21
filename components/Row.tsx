import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    }
})

export const Row = ({ testID = '', style = {}, children }) => {
    return (
        <View testID={testID} style={[styles.row, style]}>
            {children}
        </View>
    )
}