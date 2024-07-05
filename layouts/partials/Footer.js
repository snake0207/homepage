import Social from "@components/Social";
import config from "@config/config.json";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  return (
    <footer className="section bg-theme-light pb-0" style={{ background: "black"}}>
      <div className="container">
        {/* footer menu */}
        <div className="row">

          {/* social icons */}
          <div className="md-12 sm:col-12 lg:col-12">
            {markdownify(footer_content.addr, "p", "mt-3")}
            {markdownify(footer_content.contact, "p", "mb-6")}
            <Social source={social} className="social-icons mb-8" />
          </div>
        </div>
        {/* copyright */}
        <div className="border-t border-border py-6">
          {markdownify(copyright, "p", "text-sm text-center")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
