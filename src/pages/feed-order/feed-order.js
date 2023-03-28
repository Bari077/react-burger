import AppHeader from '../../components/App-Header/App-Header';
import { FeedOrder } from '../../components/Feed-Order/Feed-Order';

export const FeedOrderPage =()=> {

    return (
        <div className="App">
            <AppHeader />
            <main className="main">
               <FeedOrder />            
            </main>            
        </div>
    )
}
