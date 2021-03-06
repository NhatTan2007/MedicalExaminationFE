export class MedicalRecordDetails {
	finalExaminationResult: FinalExaminationResult;
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
		this.finalExaminationResult = new FinalExaminationResult();
	}
}

export class MedicalRecordDetailsUpdate extends MedicalRecordDetails {
	medicalRecordId: string
	constructor(medicalRecordId: string) {
		super()
		this.medicalRecordId = medicalRecordId
	}
}

export abstract class AExaminationRooms {
	departmentId: string
	mServiceId: number
	isRegistered: boolean
	price: number
	doctorId: string
	doctorName: string
	objName: string

	constructor() {
		this.isRegistered = false;
	}
}

export class AbdominalUltrasound extends AExaminationRooms {
	// Si??u ??m b???ng - Ch???n ??o??n h??nh ???nh
	abdominalUltrasoundResult: string;

	constructor() {
		super();
		this.mServiceId = 5;
		this.price = 0;
		this.departmentId = '';
		this.abdominalUltrasoundResult = '';
	}
}

export class BloodTests extends AExaminationRooms {
	//X??t nghi???m m??u
	hcAmount: number; //S??? l?????ng HC
	leukocytesAmount: number; // S??? l?????ng b???ch c???u
	plateletsAmount: number; // S??? l?????ng ti???u c???u
	bloodSugar: number; //???????ng huy???t
	ure: number;
	creatinin: number;
	asatgot: number;
	alatgpt: number;

	constructor() {
		super();
		this.mServiceId = 10;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.hcAmount = 0;
		this.leukocytesAmount = 0;
		this.plateletsAmount = 0;
		this.bloodSugar = 0;
		this.ure = 0;
		this.creatinin = 0;
		this.asatgot = 0;
		this.alatgpt = 0;
	}
}

export class BreastUltrasound extends AExaminationRooms {
	// Si??u ??m tuy???n v?? - Ch???n ??o??n h??nh ???nh
	breastUltrasoundResult: string;

	constructor() {
		super();
		this.mServiceId = 1;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.breastUltrasoundResult = '';
	}
}

export class CardiacUltrasoundProbes extends AExaminationRooms {
	// Th??m d?? tim m???ch - Ch???n ??o??n h??nh ???nh
	cardiacUltrasoundProbesResult: string;

	constructor() {
		super();
		this.mServiceId = 3;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.cardiacUltrasoundProbesResult = '';
	}
}

export class ChestXray extends AExaminationRooms {
	// Xquang ng???c
	chestXrayResult: string;

	constructor() {
		super();
		this.mServiceId = 7;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.chestXrayResult = '';
	}
}

export class ClinicalUrineTests extends AExaminationRooms {
	// X??t nghi???m n?????c ti???u
	sugar: boolean;
	protein: boolean;
	other: string;

	constructor() {
		super();
		this.mServiceId = 11;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.sugar = false;
		(this.protein = false), (this.other = '');
	}
}

export class DermatologyExamination extends AExaminationRooms {
	//Da li???u
	dermatology: string;
	dermatologyLevel: number;

	constructor() {
		super();
		this.mServiceId = 12;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.dermatology = '';
		this.dermatologyLevel = 0;
	}
}

export class InternalMedicineExamination extends AExaminationRooms {
	// N???i khoa
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
		this.mServiceId = 13;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
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
	//Ch???n ??o??n h??nh ???nh - Ch???n ??o??n h??nh ???nh y t???
	result: string;

	constructor() {
		super();
		this.mServiceId = 19;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.result = '';
	}
}

export class NeurologyExamination extends AExaminationRooms {
	//Th???n kinh - t??m th???n
	neurosurgery: string;
	neurosurgeryLevel: number;
	psychiatry: string;
	psychiatryLevel: number;

	constructor() {
		super();
		this.mServiceId = 17;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.neurosurgery = '';
		this.neurosurgeryLevel = 0;
		this.psychiatry = '';
		this.psychiatryLevel = 0;
	}
}

export class ObstetricsAndGynecologyExamination extends AExaminationRooms {
	//S???n ph??? khoa
	obstetricsAndGynecology: string;
	obstetricsAndGynecologyLevel: number;

	constructor() {
		super();
		this.mServiceId = 18;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.obstetricsAndGynecology = '';
		this.obstetricsAndGynecologyLevel = 0;
	}
}

export class OphthalmologyExamination extends AExaminationRooms {
	//M???t
	rightEyeSightWithoutGlass: string;
	leftEyeSightWithoutGlass: string;
	rightEyeSightWithGlass: string;
	leftEyeSightWithGlass: string;
	eyeDiseases: string;
	ophthalmologyLevel: number;

	constructor() {
		super();
		this.mServiceId = 14;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.rightEyeSightWithoutGlass = '';
		this.leftEyeSightWithoutGlass = '';
		this.rightEyeSightWithGlass = '';
		this.leftEyeSightWithGlass = '';
		this.eyeDiseases = '';
		this.ophthalmologyLevel = 0;
	}
}

export class OralAndMaxillofacialExamination extends AExaminationRooms {
	//R??ng h??m m???t
	upperJaw: string;
	lowerJaw: string;
	oralAndMaxillofacialDiseases: string;
	oralAndMaxillofacialLevel: number;

	constructor() {
		super();
		this.mServiceId = 15;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.upperJaw = '';
		this.lowerJaw = '';
		this.oralAndMaxillofacialDiseases = '';
		this.oralAndMaxillofacialLevel = 0;
	}
}

export class OtorhinolaryngologyExamination extends AExaminationRooms {
	//Tai m??i h???ng
	leftEarNormal: number;
	rightEarNormal: number;
	leftEarWhisper: number;
	rightEarWhisper: number;
	otorhinolaryngologyDiseases: string;
	otorhinolaryngologyLevel: number;

	constructor() {
		super();
		this.mServiceId = 16;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.leftEarNormal = 0;
		this.rightEarNormal = 0;
		this.leftEarWhisper = 0;
		this.rightEarWhisper = 0;
		this.otorhinolaryngologyDiseases = '';
		this.otorhinolaryngologyLevel = 0;
	}
}

export class PhysicalExamination extends AExaminationRooms {
	//Th??? l???c
	height: number;
	weight: number;
	bmiIndex: number;
	heartBeat: number;
	bloodPressure: string;
	physicalLevel: number;

	constructor() {
		super();
		this.mServiceId = 9;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.height = 0;
		this.weight = 0;
		this.bmiIndex = 0;
		this.heartBeat = 0;
		this.bloodPressure = '';
		this.physicalLevel = 0;
	}
}

export class SurgeryExamination extends AExaminationRooms {
	//Ngo???i khoa
	surgery: string;
	surgeryLevel: number;

	constructor() {
		super();
		this.mServiceId = 20;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.surgery = '';
		this.surgeryLevel = 0;
	}
}

export class ThyroidUltrasound extends AExaminationRooms {
	// Si??u ??m tuy???n gi??p - Ch???n ??o??n h??nh ???nh
	thyroidUltrasoundResult: string;

	constructor() {
		super();
		this.mServiceId = 8;
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.thyroidUltrasoundResult = '';
	}
}

export class FinalExaminationResult extends AExaminationRooms {
	//K???t lu???n b??c s?? t???ng h???p
	healthyLevel: number;
	otherDiseases: string;
	
	constructor() {
		super();
		this.mServiceId = 0;
		this.isRegistered = true
		this.price = 0;
		this.departmentId = '';
		this.doctorId = '';
		this.doctorName = '';
		this.healthyLevel = 0;
		this.otherDiseases = ''
	}
}
