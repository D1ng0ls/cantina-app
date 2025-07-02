import Header from '@/components/cabeçalho/header';
import { SafeAreaView, ScrollView } from "react-native";
import Footer from "../rodape/footer";

export default function Layout({ children }: { children: React.ReactNode, style?: any }) {
    return (
        <SafeAreaView style={{ flex: 1, height: '100%', zIndex: 0 }}>
            <Header />
            <ScrollView style={{ margin: 'auto', width: '100%', marginBottom: 56, marginTop: 63 }}>
                {children}
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}