import { CardImg, Navbar } from 'reactstrap';
import Logo from "../../public/ecomm.svg"

const Header = () => {
    return (
        <>
            <Navbar expand="lg" className="topbar bg-white bottom">
                <div className="d-flex gap-2">
                    <div>
                        <CardImg src={Logo} alt="logo" width={40} height={40} />
                    </div>
                    <div className="d-flex align-items-center">
                        <h4 className="flex-grow-1">E-Commerce</h4>
                    </div>
                </div>

            </Navbar>
        </>
    );
};

export default Header;
