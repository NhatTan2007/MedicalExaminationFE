export abstract class AExaminationRooms
{
  MServiceId! : number;
  IsRegistered: boolean;
  Price:        number;

  constructor() {
     this.IsRegistered = false;

   }
}

export class AbdominalUltrasound extends AExaminationRooms // Siêu âm bụng - Chẩn đoán hình ảnh
{
    AbdominalUltrasoundResult : string;
}

export class BloodTests extends AExaminationRooms //Xét nghiệm máu
{
    HCAmount:         number;    //Số lượng HC
    LeukocytesAmount: number;    // Số lượng bạch cầu
    PlateletsAmount:  number;   // Số lượng tiểu cầu
    BloodSugar:       number;   //Đường huyết
    Ure:              number;
    Creatinin:        number;
    ASATGOT:          number;
    ALATGPT:          number;
}

export class BreastUltrasound extends AExaminationRooms // Siêu âm tuyến vú - Chẩn đoán hình ảnh
{
  BreastUltrasoundResult: string;
}

export class CardiacUltrasoundProbes extends AExaminationRooms // Thăm dò tim mạch - Chẩn đoán hình ảnh
{
  CardiacUltrasoundProbesResult: string;
}

export class ChestXray extends AExaminationRooms // Xquang ngực
{
  ChestXrayResult: string;
}

export class ClinicalUrineTests extends AExaminationRooms // Xét nghiệm nước tiểu
{
  Sugar :   boolean;
  Protein : boolean;
  Other :   string;
}

export class DermatologyExamination extends AExaminationRooms //Da Lieu
{
   Dermatology :      string;
   DermatologyLevel : number;
}

export class InternalMedicineExamination extends AExaminationRooms // Nội khoa
{
  Circulatory :         string;
  CirculatoryLevel :    number;
  Respiratory :         string;
  RespiratoryLevel :    number;
  Alimentary :          string;
  AlimentaryLevel :     number;
  NephroUrology :       string;
  NephroUrologyLevel :  number;
  Musculoskeletal :     string;
  MusculoskeletalLevel :number;
}

export class MedicalImagingDiagnostics extends AExaminationRooms //Chẩn đoán hình ảnh
{
  Result : string;
}

export class NeurologyExamination extends AExaminationRooms //Thần kinh - tâm thần
{
  Neurosurgery :      string;
  NeurosurgeryLevel:  number;
  Psychiatry :        string;
  PsychiatryLevel:    number;
}

export class ObstetricsAndGynecologyExamination extends AExaminationRooms //Sản phụ khoa
{
  ObstetricsAndGynecology :     string;
  ObstetricsAndGynecologyLevel: number;

}

export class OphthalmologyExamination extends AExaminationRooms //Mắt
{
  RightEyeSightWithoutGlass : string;
  LeftEyeSightWithoutGlass :  string;
  RightEyeSightWithGlass :    string;
  LeftEyeSightWithGlass :     string;
  EyeDiseases :               string;
  OphthalmologyLevel:         number;
}

export class OralAndMaxillofacialExamination extends AExaminationRooms //Răng hàm mặt
{
  UpperJaw : string;
  LowerJaw : string;
  OralAndMaxillofacialDiseases : string;
  OralAndMaxillofacialLevel: number;
}

export class OtorhinolaryngologyExamination extends AExaminationRooms //Tai mũi họng
{
  LeftEarNormal: number;
  RightEarNormal: number;
  LeftEarWhisper: number;
  RightEarWhisper: number;
  OtorhinolaryngologyDiseases: string;
  OtorhinolaryngologyLevel: number;
}

export class PhysicalExamination extends AExaminationRooms //Thể lực
{
  Height: number;
  Weight: number;
  BMIIndex: number;
  HeartBeat: number;
  PhysicalLevel: number;
}

export class SurgeryExamination extends AExaminationRooms //Ngoại khoa
{
  Surgery:      string
  SurgeryLevel: number;
}

export class ThyroidUltrasound extends AExaminationRooms // Siêu âm tuyến giáp - Chẩn đoán hình ảnh
{
  ThyroidUltrasoundResult: string

}









