import CertificateDetails from "@/app/_modules/certificate/views/certificate-details";
import { TParams } from "@/types/params";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate Info",
  description: "Certificate user page",
};
const CertificateInfoPage = async ({
  params,
}: TParams) => {
  const { id: certificateId  } = await params;
  return (
    <div>
      <CertificateDetails certificateId={certificateId} />
    </div>
  );
};

export default CertificateInfoPage;
