import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import Footer from "../rodape/footer";
import Header from '@/components/cabeçalho/header';

export default function Layout({ children }: { children: React.ReactNode, style?: any }) {
    return (
        <SafeAreaView style={{ flex: 1, height: '100%', zIndex: 0 }}>
            <Header />
            {/* <ScrollView style={{ margin: 'auto', width: '100%', marginBottom: 56, marginTop: 20 }}> */}
                {children}
            {/* </ScrollView> */}
            <Footer />
        </SafeAreaView>
    )
}