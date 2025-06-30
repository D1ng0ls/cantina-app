import { View } from "react-native";
import Footer from "../rodape/footer";

export default function Layout({ children }: { children: React.ReactNode, style?: any }) {
    return (
        <View style={{flex: 1}}>
            {children}
            <Footer />
        </View>
    )
}