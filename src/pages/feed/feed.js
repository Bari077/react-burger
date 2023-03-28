import AppHeader from "../../components/App-Header/App-Header";
import { Feed } from "../../components/Feed/Feed";

export const FeedPage =()=> {
    return (
        <div className="App">
            <AppHeader />
            <main className="main">
            <h2 className="text text_type_main-large pl-5 pb-5">Лента заказов</h2>
                <div className="content">
                    <Feed />
                </div>                                                                
            </main>            
        </div>
    )
}