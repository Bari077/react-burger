import AppHeader from "../../components/App-Header/App-Header";


export const NotFound404 =(): JSX.Element => {
    return (
        <div className="App">
            <AppHeader />
            <div className="notFound">
                <p className="text text_type_digits-large pt-20 mb-4">404</p>
                <p className="text text_type_main-large text_color_inactive mb-6">Not Found</p>
                <p className="text text_type_main-medium text_color_inactive">Страница не существует</p>                                                               
            </div>            
        </div>
    )
}