export class MedicalRecordDetails {
  abdominalUltrasound: AbdominalUltrasound;
  bloodTests: BloodTests;
  breastUltrasound: BreastUltrasound;
  cardiacUltrasoundProbes: CardiacUltrasoundProbes;
  chestXray: ChestXray;
  clinicalUrineTests: ClinicalUrineTests;
  dermatologyExamination: DermatologyExamination;
  internalMedicineExamination: InternalMedicineExamination;
  medicalImagingDiagnostics: MedicalImagingDiagnostics;
  neurologyExamination: NeurologyExamination;
  obstetricsAndGynecologyExamination: ObstetricsAndGynecologyExamination;
  ophthalmologyExamination: OphthalmologyExamination;
  oralAndMaxillofacialExamination: OralAndMaxillofacialExamination;
  otorhinolaryngologyExamination: OtorhinolaryngologyExamination;
  physicalExamination: PhysicalExamination;
  surgeryExamination: SurgeryExamination;
  thyroidUltrasound: ThyroidUltrasound;

  constructor() {
    this.abdominalUltrasound = new AbdominalUltrasound();
    this.bloodTests = new BloodTests();
    this.breastUltrasound = new BreastUltrasound();
    this.cardiacUltrasoundProbes = new CardiacUltrasoundProbes();
    this.chestXray = new ChestXray();
    this.clinicalUrineTests = new ClinicalUrineTests();
    this.dermatologyExamination = new DermatologyExamination();
    this.internalMedicineExamination = new InternalMedicineExamination();
    this.medicalImagingDiagnostics = new MedicalImagingDiagnostics();
    this.neurologyExamination = new NeurologyExamination();
    this.obstetricsAndGynecologyExamination = new ObstetricsAndGynecologyExamination();
    this.ophthalmologyExamination = new OphthalmologyExamination();
    this.oralAndMaxillofacialExamination = new OralAndMaxillofacialExamination();
    this.otorhinolaryngologyExamination = new OtorhinolaryngologyExamination();
    this.physicalExamination = new PhysicalExamination();
    this.surgeryExamination = new SurgeryExamination();
    this.thyroidUltrasound = new ThyroidUltrasound();
  }
}

export abstract class AExaminationRooms {
  departmentId: string;
  mServiceId: number;
  isRegistered: boolean;
  price: number;

  constructor() {
    this.isRegistered = false;
  }
}

export class AbdominalUltrasound extends AExaminationRooms {
  // Siêu âm bụng - Chẩn đoán hình ảnh
  abdominalUltrasoundResult: string;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.abdominalUltrasoundResult = '';
  }
}

export class BloodTests extends AExaminationRooms {
  //Xét nghiệm máu
  hCAmount: number; //Số lượng HC
  leukocytesAmount: number; // Số lượng bạch cầu
  plateletsAmount: number; // Số lượng tiểu cầu
  bloodSugar: number; //Đường huyết
  ure: number;
  creatinin: number;
  aSATGOT: number;
  aLATGPT: number;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.hCAmount = 0;
    this.leukocytesAmount = 0;
    this.plateletsAmount = 0;
    this.bloodSugar = 0;
    this.ure = 0;
    this.creatinin = 0;
    this.aSATGOT = 0;
    this.aLATGPT = 0;
  }
}

export class BreastUltrasound extends AExaminationRooms {
  // Siêu âm tuyến vú - Chẩn đoán hình ảnh
  breastUltrasoundResult: string;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.breastUltrasoundResult = '';
  }
}

export class CardiacUltrasoundProbes extends AExaminationRooms {
  // Thăm dò tim mạch - Chẩn đoán hình ảnh
  cardiacUltrasoundProbesResult: string;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.cardiacUltrasoundProbesResult = '';
  }
}

export class ChestXray extends AExaminationRooms {
  // Xquang ngực
  chestXrayResult: string;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.chestXrayResult = '';
  }
}

export class ClinicalUrineTests extends AExaminationRooms {
  // Xét nghiệm nước tiểu
  sugar: boolean;
  protein: boolean;
  other: string;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.sugar = false;
    (this.protein = false), (this.other = '');
  }
}

export class DermatologyExamination extends AExaminationRooms {
  //Da Lieu
  dermatology: string;
  dermatologyLevel: number;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.dermatology = '';
    this.dermatologyLevel = 0;
  }
}

export class InternalMedicineExamination extends AExaminationRooms {
  // Nội khoa
  circulatory: string;
  circulatoryLevel: number;
  respiratory: string;
  respiratoryLevel: number;
  alimentary: string;
  alimentaryLevel: number;
  nephroUrology: string;
  nephroUrologyLevel: number;
  musculoskeletal: string;
  musculoskeletalLevel: number;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.circulatory = '';
    this.circulatoryLevel = 0;
    this.respiratory = '';
    this.respiratoryLevel = 0;
    this.alimentary = '';
    this.alimentaryLevel = 0;
    this.nephroUrology = '';
    this.nephroUrologyLevel = 0;
    this.musculoskeletal = '';
    this.musculoskeletalLevel = 0;
  }
}

export class MedicalImagingDiagnostics extends AExaminationRooms {
  //Chẩn đoán hình ảnh - Chẩn đoán hình ảnh y tế
  result: string;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.result = '';
  }
}

export class NeurologyExamination extends AExaminationRooms {
  //Thần kinh - tâm thần
  neurosurgery: string;
  neurosurgeryLevel: number;
  psychiatry: string;
  psychiatryLevel: number;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.neurosurgery = '';
    this.neurosurgeryLevel = 0;
    this.psychiatry = '';
    this.psychiatryLevel = 0;
  }
}

export class ObstetricsAndGynecologyExamination extends AExaminationRooms {
  //Sản phụ khoa
  obstetricsAndGynecology: string;
  obstetricsAndGynecologyLevel: number;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.obstetricsAndGynecology = '';
    this.obstetricsAndGynecologyLevel = 0;
  }
}

export class OphthalmologyExamination extends AExaminationRooms {
  //Mắt
  rightEyeSightWithoutGlass: string;
  leftEyeSightWithoutGlass: string;
  rightEyeSightWithGlass: string;
  leftEyeSightWithGlass: string;
  eyeDiseases: string;
  ophthalmologyLevel: number;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.rightEyeSightWithoutGlass = '';
    this.leftEyeSightWithoutGlass = '';
    this.rightEyeSightWithGlass = '';
    this.leftEyeSightWithGlass = '';
    this.eyeDiseases = '';
    this.ophthalmologyLevel = 0;
  }
}

export class OralAndMaxillofacialExamination extends AExaminationRooms {
  //Răng hàm mặt
  upperJaw: string;
  lowerJaw: string;
  oralAndMaxillofacialDiseases: string;
  oralAndMaxillofacialLevel: number;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.upperJaw = '';
    this.lowerJaw = '';
    this.oralAndMaxillofacialDiseases = '';
    this.oralAndMaxillofacialLevel = 0;
  }
}

export class OtorhinolaryngologyExamination extends AExaminationRooms {
  //Tai mũi họng
  leftEarNormal: number;
  rightEarNormal: number;
  leftEarWhisper: number;
  rightEarWhisper: number;
  otorhinolaryngologyDiseases: string;
  otorhinolaryngologyLevel: number;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.leftEarNormal = 0;
    this.rightEarNormal = 0;
    this.leftEarWhisper = 0;
    this.rightEarWhisper = 0;
    this.otorhinolaryngologyDiseases = '';
    this.otorhinolaryngologyLevel = 0;
  }
}

export class PhysicalExamination extends AExaminationRooms {
  //Thể lực - thuoc ngoai khoa
  height: number;
  weight: number;
  bMIIndex: number;
  heartBeat: number;
  physicalLevel: number;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.height = 0;
    this.weight = 0;
    this.bMIIndex = 0;
    this.heartBeat = 0;
    this.physicalLevel = 0;
  }
}

export class SurgeryExamination extends AExaminationRooms {
  //Ngoại khoa
  surgery: string;
  surgeryLevel: number;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.surgery = '';
    this.surgeryLevel = 0;
  }
}

export class ThyroidUltrasound extends AExaminationRooms {
  // Siêu âm tuyến giáp - Chẩn đoán hình ảnh
  thyroidUltrasoundResult: string;

  constructor() {
    super();
    this.mServiceId = 0;
    this.price = 0;
    this.departmentId = '';
    this.thyroidUltrasoundResult = '';
  }
}
